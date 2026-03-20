import * as fs from 'fs';

const html = fs.readFileSync('tmp_p8_content.html', 'utf8');

// The main topics have <li data-list="bullet"><span ...></span><strong>Topic</strong></li>
// We want to change the main topics to data-list="ordered"
// The indented ones stay as bullet

let newHtml = html.replace(/<li data-list="bullet">(<span[^>]*><\/span>)?<strong>((?!O que é|Link).*?)<\/strong><\/li>/g, '<li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><strong>$2</strong></li>');

fs.writeFileSync('tmp_p8_content_fixed.html', newHtml);
