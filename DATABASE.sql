-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles (vinculada a auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de atletas
CREATE TABLE public.athletes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trainer_id UUID REFERENCES public.profiles(id) NOT NULL,
    name TEXT NOT NULL,
    photo_url TEXT,
    level TEXT,
    goal TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de métricas de rendimiento
CREATE TABLE public.performance_metrics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trainer_id UUID REFERENCES public.profiles(id) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    unit TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de registros de métricas por atleta
CREATE TABLE public.athlete_metric_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    athlete_id UUID REFERENCES public.athletes(id) NOT NULL,
    metric_id UUID REFERENCES public.performance_metrics(id) NOT NULL,
    value NUMERIC NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_athletes_trainer_id ON public.athletes(trainer_id);
CREATE INDEX idx_performance_metrics_trainer_id ON public.performance_metrics(trainer_id);
CREATE INDEX idx_athlete_metric_records_athlete_id ON public.athlete_metric_records(athlete_id);
CREATE INDEX idx_athlete_metric_records_metric_id ON public.athlete_metric_records(metric_id);
CREATE INDEX idx_athlete_metric_records_recorded_at ON public.athlete_metric_records(recorded_at);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athlete_metric_records ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para athletes
CREATE POLICY "Trainers can view own athletes" ON public.athletes
    FOR SELECT USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can insert own athletes" ON public.athletes
    FOR INSERT WITH CHECK (auth.uid() = trainer_id);

CREATE POLICY "Trainers can update own athletes" ON public.athletes
    FOR UPDATE USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can delete own athletes" ON public.athletes
    FOR DELETE USING (auth.uid() = trainer_id);

-- Políticas RLS para performance_metrics
CREATE POLICY "Trainers can view own metrics" ON public.performance_metrics
    FOR SELECT USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can insert own metrics" ON public.performance_metrics
    FOR INSERT WITH CHECK (auth.uid() = trainer_id);

CREATE POLICY "Trainers can update own metrics" ON public.performance_metrics
    FOR UPDATE USING (auth.uid() = trainer_id);

CREATE POLICY "Trainers can delete own metrics" ON public.performance_metrics
    FOR DELETE USING (auth.uid() = trainer_id);

-- Políticas RLS para athlete_metric_records
CREATE POLICY "Trainers can view own athlete records" ON public.athlete_metric_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.athletes 
            WHERE id = athlete_metric_records.athlete_id 
            AND trainer_id = auth.uid()
        )
    );

CREATE POLICY "Trainers can insert own athlete records" ON public.athlete_metric_records
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.athletes 
            WHERE id = athlete_metric_records.athlete_id 
            AND trainer_id = auth.uid()
        )
    );

CREATE POLICY "Trainers can update own athlete records" ON public.athlete_metric_records
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.athletes 
            WHERE id = athlete_metric_records.athlete_id 
            AND trainer_id = auth.uid()
        )
    );

CREATE POLICY "Trainers can delete own athlete records" ON public.athlete_metric_records
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.athletes 
            WHERE id = athlete_metric_records.athlete_id 
            AND trainer_id = auth.uid()
        )
    );

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_athletes_updated_at
    BEFORE UPDATE ON public.athletes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_performance_metrics_updated_at
    BEFORE UPDATE ON public.performance_metrics
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger para crear perfil automáticamente al registrar usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (new.id, new.raw_user_meta_data->>'name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
