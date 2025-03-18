document.addEventListener("DOMContentLoaded", function () {
    let snippetList = document.getElementById("snippetList");
  
    chrome.storage.local.get("snippets", function (data) {
      snippetList.innerHTML = "";
  
      (data.snippets || []).forEach((snippet, index) => {
        let li = document.createElement("li");
        li.style.backgroundColor = snippet.color;
        li.classList.add("snippet");
  
        let text = document.createElement("span");
        text.textContent = snippet.text;
  
        let link = document.createElement("a");
        link.href = snippet.url;
        link.textContent = "🔗";
        link.target = "_blank";
  
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.classList.add("delete-btn");
        removeBtn.onclick = function () {
          chrome.storage.local.get("snippets", function (data) {
            let snippets = data.snippets || [];
            snippets.splice(index, 1);
            chrome.storage.local.set({ snippets: snippets }, function () {
              location.reload();
            });
          });
        };
  
        li.appendChild(text);
        li.appendChild(link);
        li.appendChild(removeBtn);
        snippetList.appendChild(li);
      });
    });
  });
  