document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const hashtagInput = document.getElementById('hashtagInput');
    const processBtn = document.getElementById('processBtn');
    const output = document.getElementById('output');
  
    processBtn.addEventListener('click', async () => {
      if (fileInput.files.length === 0) {
        alert('Please select a JSON file.');
        return;
      }
  
      const hashtag = hashtagInput.value.trim();
      if (!hashtag) {
        alert('Please enter a hashtag to filter by.');
        return;
      }
  
      const file = fileInput.files[0];
      const content = await file.text();
      const data = JSON.parse(content);
      
      const filteredPages = data.pages.filter(page => {
        return page.lines.some(line => line.text.includes(hashtag));
      });
  
      if (filteredPages.length === 0) {
        output.textContent = 'No pages found with the specified hashtag.';
        return;
      }
  
      const filteredData = { ...data, pages: filteredPages };
      const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `filtered_${hashtag.replace('#', '')}_${file.name}`;
      link.textContent = `Click here to download the filtered JSON file (${filteredPages.length} pages)`;
      output.innerHTML = '';
      output.appendChild(link);
    });
  });
  