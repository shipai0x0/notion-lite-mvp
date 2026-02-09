async function generate() {
    const pageId = document.getElementById('pageId').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!pageId) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter a Notion Page ID</p>';
        return;
    }
    
    resultDiv.innerHTML = 'Loading...';
    
    try {
        const response = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Clear the result div
        resultDiv.innerHTML = '';
        
        // Process blocks in order
        // The API returns an object where keys are block IDs and values are block data
        // We need to find the root blocks and render them in order
        // For simplicity, we'll assume the first few blocks are in order
        // But a better approach is to track parent-child relationships
        
        // Let's find blocks that don't have a parent or are top-level
        // For now, we'll render all blocks in the order they appear in the object
        // This may not be perfect, but it's a start
        
        // We'll collect all blocks and sort them by their position in the page
        // Since the API doesn't provide order, we'll render them as they come
        
        for (const blockId in data) {
            const block = data[blockId];
            renderBlock(block, resultDiv);
        }
        
    } catch (error) {
        console.error('Error fetching Notion page:', error);
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function renderBlock(block, container) {
    const blockElement = document.createElement('div');
    blockElement.className = 'notion-block';
    
    // Check block type
    const type = block.type;
    
    switch (type) {
        case 'header':
        case 'heading_1':
            const h1 = document.createElement('h1');
            h1.className = 'notion-heading1';
            h1.textContent = block.properties?.title || '';
            blockElement.appendChild(h1);
            break;
            
        case 'sub_header':
        case 'heading_2':
            const h2 = document.createElement('h2');
            h2.className = 'notion-heading2';
            h2.textContent = block.properties?.title || '';
            blockElement.appendChild(h2);
            break;
            
        case 'sub_sub_header':
        case 'heading_3':
            const h3 = document.createElement('h3');
            h3.className = 'notion-heading3';
            h3.textContent = block.properties?.title || '';
            blockElement.appendChild(h3);
            break;
            
        case 'text':
        case 'paragraph':
            const p = document.createElement('p');
            p.className = 'notion-text';
            p.textContent = block.properties?.title || '';
            blockElement.appendChild(p);
            break;
            
        case 'image':
            const img = document.createElement('img');
            img.className = 'notion-image';
            // The image URL might be in different places
            const imageUrl = block.properties?.source?.[0] || block.format?.display_source;
            if (imageUrl) {
                img.src = imageUrl;
                img.alt = 'Notion image';
            } else {
                img.alt = 'Image not available';
            }
            blockElement.appendChild(img);
            break;
            
        case 'bulleted_list':
        case 'bulleted_list_item':
            const ul = document.createElement('ul');
            ul.className = 'notion-list notion-bulleted-list';
            const li = document.createElement('li');
            li.className = 'notion-list-item';
            li.textContent = block.properties?.title || '';
            ul.appendChild(li);
            blockElement.appendChild(ul);
            break;
            
        case 'numbered_list':
        case 'numbered_list_item':
            const ol = document.createElement('ol');
            ol.className = 'notion-list notion-numbered-list';
            const oli = document.createElement('li');
            oli.className = 'notion-list-item';
            oli.textContent = block.properties?.title || '';
            ol.appendChild(oli);
            blockElement.appendChild(ol);
            break;
            
        default:
            // For unsupported block types, show a message
            const unsupported = document.createElement('div');
            unsupported.className = 'notion-text';
            unsupported.textContent = `[Unsupported block type: ${type}]`;
            if (block.properties?.title) {
                unsupported.textContent += ' ' + block.properties.title;
            }
            blockElement.appendChild(unsupported);
            break;
    }
    
    container.appendChild(blockElement);
}
