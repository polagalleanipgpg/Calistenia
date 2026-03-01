import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE)
const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON)

export async function GET(req: Request) {
  // Never expose debug info in production
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 })
  }

  const url = new URL(req.url)
  const bucket = url.searchParams.get('bucket')
  const path = url.searchParams.get('path')

  const out: any = {
    env: {
      urlPresent: !!SUPABASE_URL,
      anonPresent: !!SUPABASE_ANON,
      servicePresent: !!SUPABASE_SERVICE,
    },
  }

  // Query using service role
  try {
    const { data, error, status } = await serviceClient
      .from('athletes')
      .select('id,name,trainer_id')
      .limit(1)

    out.serviceQuery = { status, error: error ? { message: error.message } : null, data }
  } catch (e: any) {
    out.serviceQuery = { error: String(e) }
  }

  // Query using anon key
  try {
    const { data, error, status } = await anonClient
      .from('athletes')
      .select('id,name,trainer_id')
      .limit(1)

    out.anonQuery = { status, error: error ? { message: error.message } : null, data }
  } catch (e: any) {
    out.anonQuery = { error: String(e) }
  }

  // Optional: Storage checks if bucket+path provided
  if (bucket && path) {
    out.storage = {}
    try {
      const publicUrl = `${SUPABASE_URL.replace(/\/+$/, '')}/storage/v1/object/public/${bucket}/${encodeURIComponent(path)}`
      const head = await fetch(publicUrl, { method: 'HEAD' })
      out.storage.publicHead = { status: head.status, statusText: head.statusText }
    } catch (e: any) {
      out.storage.publicHeadError = String(e)
    }

    try {
      // createSignedUrl returns { signedUrl }
      // @ts-ignore
      const { data, error } = await serviceClient.storage.from(bucket).createSignedUrl(path, 60)
      out.storage.signedUrl = data?.signedUrl ?? null
      out.storage.signedUrlError = error ? { message: error.message } : null
    } catch (e: any) {
      out.storage.signedUrlError = String(e)
    }
  }

  return NextResponse.json(out)
}
