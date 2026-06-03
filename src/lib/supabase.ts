import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ikfsgebpkdjulddsnuno.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrg3NnZWJwa2RqdWxkZHNudW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NjIzMjYsImV4cCI6MjA5NjAzODMyNn0.3L_6hdSdUL1jy7NWrxxrL2hCxAoag79_DaWlPdN_yD8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
