// Initialize Supabase Client — exposed as window.db for use across all scripts
const supabaseUrl = 'https://ktgdjnjmwhbbpikooddr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Z2Rqbmptd2hiYnBpa29vZGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTQwNDUsImV4cCI6MjA5Nzc3MDA0NX0.-tgxa8vlp900LyD28_4iSdysIKig_h0KYu2vKP1Mz50';

window.db = window.supabase.createClient(supabaseUrl, supabaseKey);
