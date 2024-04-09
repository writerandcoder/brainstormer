        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

        function downloadAsDoc() {
            var noteContent = document.getElementById('note').innerText;
            var filename = '--Brainstorm.doc';
            // Here you can add logic to convert noteContent to .doc format if needed
            download(filename, noteContent);
        }

        function downloadAsTxt() {
            var noteContent = document.getElementById('note').innerText;
            var filename = '--Brainstorm.txt';
            download(filename, noteContent);
        }