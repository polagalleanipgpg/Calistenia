import { redirect } from 'next/navigation'

export default function Home() {
  // Default to the login page so unauthenticated visitors don't get a 404
  redirect('/login')
}
