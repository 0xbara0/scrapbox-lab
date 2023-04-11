document.addEventListener('DOMContentLoaded', () => {
    const inputFile = document.getElementById('input-file');
    const hashtagInput = document.getElementById('hashtag-input');
    const processBtn = document.getElementById('process-btn');
    const downloadLink = document.getElementById('download-link');
    
    let fileContent = null;
  
    inputFile.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            fileContent = JSON.parse(e.target.result);
            processBtn.disabled = false;
          } catch (error) {
            console.error('Invalid JSON file.');
            processBtn.disabled = true;
          }
        };
        reader.readAsText(file);
      }
    });
  
    processBtn.addEventListener('click', () => {
      const hashtag = hashtagInput.value.trim();
      if (!fileContent || !hashtag) {
        return;
      }
  
      fileContent.pages.forEach((page) => {
        if (!page.lines) {
          page.lines = [];
        }
        const hashtagLine = `#${hashtag}`;
        if (!page.lines.includes(hashtagLine)) {
          page.lines.push(hashtagLine);
        }
      });
  
      const modifiedJson = JSON.stringify(fileContent, null, 2);
      const dataUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(modifiedJson);
      downloadLink.href = dataUrl;
      downloadLink.style.display = 'block';
    });
  });
  