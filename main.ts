function getClientHtml(domain) {
  return `<html>
    <head>
      <title>Weekly Schedule</title>
      <style>
        button {
          font-size: 2vw;
        }
      </style>
    </head>
    <body>
      <div style="display: flex;" id="controls" height="10%" width="100%">
        <button style="flex: 1;" onclick="ws.send(0)">Lecture Theater</button>
        <button style="flex: 1;" onclick="ws.send(1)">Mini Theater</button>
        <button style="flex: 1;" onclick="ws.send(2)">Bio Lab</button>
        <button style="flex: 1;" onclick="ws.send(3)">Chem Lab 1</button>
        <button style="flex: 1;" onclick="ws.send(4)">Chem Lab 2</button>
      </div>
      <div id="the_output" height="90%" width="100%">
        <iframe id="the_iframe" height="92.5%" width="100%" title="Dashboard"></iframe>
      </div>
      <script>
        const ws = new WebSocket("wss://${domain}/");
        const output = document.querySelector("#the_output");
        const write = (msg) => {
          output.innerHTML = '<iframe id="the_iframe" height="92.5%" width="100%" title="Dashboard"></iframe>';
          document.querySelector("#the_iframe").contentWindow.document.write(msg);
        }
        ws.onmessage = (e) => write(e.data);
      </script>
      <div onload="ws.send(0)" hidden=true></div>
    </body>
  </html>`;
}

const lt = await Deno.readTextFile("./app_assets/lectureTheater");
const mt = await Deno.readTextFile("./app_assets/miniTheater");
const bl = await Deno.readTextFile("./app_assets/bioLab");
const cl1= await Deno.readTextFile("./app_assets/chemLab1");
const cl2= await Deno.readTextFile("./app_assets/chemLab2");

Deno.serve((request: Request) => {
  if (request.headers.get("upgrade") === "websocket") {
    // Upgrade to a web socket response if requested
    const { socket, response } = Deno.upgradeWebSocket(request);

    // Listen for incoming messages
    socket.onmessage = (_e) => {
      if (_e.data==0) socket.send(lt);
      else if (_e.data==1) socket.send(mt);
      else if (_e.data==2) socket.send(bl);
      else if (_e.data==3) socket.send(cl1);
      else if (_e.data==4) socket.send(cl2);
      else socket.send("Invalid code");
    };

    return response;
  } else {
    // Normal HTTP requests receive the client HTML
    const url = new URL(request.url);
    const body = new TextEncoder().encode(getClientHtml(url.host));
    return new Response(body);
  }
});
