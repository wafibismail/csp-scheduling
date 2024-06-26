const lt = await Deno.readTextFile("./app_assets/lectureTheater");
const mt = await Deno.readTextFile("./app_assets/miniTheater");
const bl = await Deno.readTextFile("./app_assets/bioLab");
const cl1= await Deno.readTextFile("./app_assets/chemLab1");
const cl2= await Deno.readTextFile("./app_assets/chemLab2");

function getClientHtml(domain) {
  return `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Weekly Schedule</title>
      <style>
        body {
          background-color:floralwhite;
        }
        table {
          td, th {border: 1px solid darkgoldenrod;}
          border: 1px solid darkgoldenrod;
        }
        .venueTable {
          text-align: center;
          th, td {
            padding: 5px;
          }
          th {
            background-color: blanchedalmond;
          }
          td {
            background-color: papayawhip;
          }
        }
        .scheduleTable {
          .tableHeadingsRow {
            th {
              background-color: antiquewhite;
            }
            td {
              font-style: italic;
              padding-left: 12px;
              padding-right: 12px;
              font-family: "Times New Roman"; font-size: 125%;
              background-color: blanchedalmond;
            }
          }
          .slotsRow {
            text-align: center;
            th {
              background-color: papayawhip;
            }
            td {
              font-family: Consolas,"courier new";
              background-color: cornsilk;
            }
            .unallocated {
              background-color: burlywood;
            }
          }
        }
        .moduleTable {
          .tableHeadingsRow {
            th {
              background-color: antiquewhite;
            }
            td {
              font-style: italic;
              background-color: blanchedalmond;
            }
          }
          .slotsRow {
            th {
              background-color: papayawhip;
            }
            td {
              background-color: cornsilk;
            }
          }
        }
        button {
          font-family: Consolas,"courier new";
          font-size: 150%;
          font-weight: bold;
          background-color: linen;
          border-color: cornsilk;
        }
        @media only screen and (max-width: 840px) {
          th, td {
            font-size: 2vw;
          }
          .venueTable {
            th, td {
              padding: 0.5vw;
            }
          }
          .scheduleTable {
            .tableHeadingsRow {
              td {white-space: nowrap; padding-left: 1.5vw; padding-right: 1.5vw; font-size:2vw; font-family:unset;}
            }
            .slotsRow {
              td {font-weight: bold;}
            }
          }
          .moduleTable {
            th, td {
              padding: 0.6vw;
            }
          }
          button {
            font-size: 2.85vw;
          }
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
      <div align=center id="the_output" height="90%" width="100%">
      </div>
      <script>
        const ws = new WebSocket("wss://${domain}/");
        const output = document.querySelector("#the_output");
        const write = (msg) => {
          output.innerHTML = msg;
        }
        ws.onmessage = (e) => write(e.data);
      </script>
      <div onload="ws.send(0)" hidden=true></div>
    </body>
  </html>`;
}

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
