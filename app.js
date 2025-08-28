// -------------------- SELECTORS -------------------
        const heartCount = document.getElementById("heartCount");
        const coinCount = document.getElementById("coinCount");
        const copyCount = document.getElementById("copyCount");
        const historyList = document.getElementById("historyList");
        const clearHistoryBtn = document.getElementById("clearHistory");
        const cardContainer = document.getElementById("cardContainer");

        let hearts = 0;
        let coins = 100;
        let copies = 0;



        // Function to copy text to clipboard (works in all environments)
        function copyToClipboard(text) {
            // Create a temporary textarea element
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";  // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                // Try the modern approach first
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text);
                    return true;
                }
                // Fallback for older browsers
                const successful = document.execCommand('copy');
                if (!successful) {
                    throw new Error('Fallback copy method failed');
                }
                return true;
            } catch (err) {
                console.error('Failed to copy: ', err);
                return false;
            } finally {
                document.body.removeChild(textArea);
            }
        }


    
        // Events
        cardContainer.addEventListener("click", (e) => {
            const likeBtn = e.target.closest(".likeBtn");
            const copyBtn = e.target.closest(".copyBtn");
            const callBtn = e.target.closest(".callBtn");

             if (likeBtn) {
                 hearts++;
                 heartCount.textContent = hearts;
            }

            // -------------------- COPY --------------------
            if (copyBtn) {
                const card = copyBtn.closest(".card");
                const number = card.querySelector(".number").textContent;
                const name = card.querySelector("h4").textContent;
                const success = copyToClipboard(number);
            
                if (success) {
                    alert(`✅ ${name} number copied: ${number}`);
                    copies++;
                    copyCount.textContent = copies;   
                } 
            }

            // -------------------- CALL --------------------
            if (callBtn) {
                const card = callBtn.closest(".card");
                const number = card.querySelector(".number").textContent;
                const name = card.querySelector("h4").textContent;

                if (coins < 20) {
                     alert("❌ Not enough coins to make a call!");
                    return;
                }

                coins -= 20;
                coinCount.textContent = coins;

                 alert(`📞 Calling ${name} at ${number}`);

                const time = new Date().toLocaleTimeString("en-BD", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Dhaka",
                });

                const li = document.createElement("li");
                li.innerHTML = `
                <div class="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2">
                    <div>
                    <p class="font-bold text-xl">${name}</p>
                    <p class="text-gray-600 font-semibold text-xl">${number}</p>
                    </div>
                    <span class="text-lg text-gray-500 font-semibold">${time}</span>
                </div>
                `;
                historyList.appendChild(li);
            }
        });

        // -------------------- CLEAR HISTORY --------------------
        clearHistoryBtn.addEventListener("click", () => {
            historyList.innerHTML = "";
        });