export const getHtmlInEditor = (blocks = []) => {
    if(!blocks || blocks.length === 0){
        return;
    }

    let html = "";

    blocks.forEach(block => {
        switch (block.type) {
            case 'header':
                html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case 'paragraph':
                html += `<p>${block.data.text}</p>`;
                break;
            case 'list':
                html += `<ul>`;

                block.data.items.forEach(item => {
                    html += `<li>${item}</li>`;
                });

                html += `</ul>`;
                break;
            case 'table':
                html += `<div class="tableContent"><table><thead><tr>`;

                block.data.content[0].forEach(header => {
                    html += `<th>${header}</th>`;
                });

                html += `</tr></thead><tbody>`;
                
                block.data.content.slice(1).forEach(row => {
                    html += `<tr>`;
                        row.forEach(cell => {
                            html += `<td>${cell}</td>`;
                        });
                    html += `</tr>`;
                });

                html += `</tbody></table></div>`;
                break;
            case 'code':
                html += `<pre><code>${block.data.code}</code></pre>`;
                break;
            case 'raw':
                html += block.data.html;
                break;
            case 'checklist':
                html += `<ol>`;

                block.data.items.forEach(item => {
                    const checked = item.checked ? 'checked' : '';
                    html += `<li><input type="checkbox" ${checked} disabled>${item.text}</li>`;
                });

                html += `</ol>`;
                break;
            case 'image':
                html += `<img src="${block.data.file.url}" alt="${block.data.caption}">`
                break;
            default:
                break;
        }
    });

    return html;
}