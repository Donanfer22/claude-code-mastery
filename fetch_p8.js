import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...ver] = line.split('=');
  if (key && ver) env[key.trim()] = ver.join('=').trim();
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('modules').select('html').eq('id', 108).single();
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  if (!data || !data.html) {
    console.log('NO CONTENT FOUND');
    return;
  }
  
  fs.writeFileSync('C:/Users/cerqu/Documents/Projetos_IDE/Curso-claude-code/claude-code-mastery-1/tmp_p8_content.html', data.html);
  console.log('Written to tmp_p8.html');
}

run();
