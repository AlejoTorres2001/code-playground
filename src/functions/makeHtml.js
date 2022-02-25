export default function makeHtml(state) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <style>
    ${state.code?.css}
    </style>
    <head/>
    <body>
    <script type="module">
    ${state.code?.javascript}
    </script>
    ${state.code?.html}
    </body>
    </html>
    `;
}
