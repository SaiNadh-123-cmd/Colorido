import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bdusbhsvgpvjvewjvbqo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdXNiaHN2Z3B2anZld2p2YnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NTc4NjcsImV4cCI6MjEwNjMzMzg2N30.PpAWf3m5b8bple8t9j1zfq6UThrkwb_bMcmHUn1Y000"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
