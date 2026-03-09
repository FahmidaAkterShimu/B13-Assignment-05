let allData = [];

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            allData = json.data;
            displayIssues(allData);
            updateCount(allData.length);
        })
};

const loadIssueDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetail(details.data);
};


// // {
// // "id": 1,
// // "title": "Fix navigation menu on mobile devices",
// // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// // "status": "open",
// // "labels": [2 items],
// // "priority": "high",
// // "author": "john_doe",
// // "assignee": "jane_smith",
// // "createdAt": "2024-01-15T10:30:00Z",
// // "updatedAt": "2024-01-15T10:30:00Z"
// // },


const displayIssueDetail = (issue) => {
    const detailsBox = document.getElementById("details-container");

    // Status & Priority color select
    const statusColor = issue.status === 'open' ? 'bg-[#00A96E]' : 'bg-[#A855F7]';
    const priorityStyle = issue.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' :
        issue.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-[#EEEFF2] text-[#9CA3AF]';

    detailsBox.innerHTML = `
        <div class="space-y-3">
            <h2 id="modal-title" class="text-2xl font-bold text-[#1F2937]">${issue.title}</h2>
            <div class="flex items-center gap-3 text-sm text-[#64748B]">
                <span id="modal-status"
                    class="${statusColor} text-white px-3 py-1 rounded-full font-medium uppercase text-xs">
                    ${issue.status}
                </span>
                <p> • Opened by <span id="modal-author" class="font-semibold text-[#1F2937]">${issue.author}</span> • 
                    <span id="modal-date">${new Date(issue.createdAt).toLocaleDateString()}</span>
                </p>
            </div>
        </div>

        <div id="modal-labels" class="flex gap-2 pt-4">
            ${issue.labels.map(label => `
                <div class="flex gap-[4px] items-center rounded-full bg-[#EFF6FF] border border-[#BFDBFE] py-[2px] px-3">
                    <p class="text-[10px] font-bold text-[#3B82F6] uppercase">${label}</p>
                </div>
            `).join('')}
        </div>

        <p id="modal-description" class="text-[#64748B] leading-relaxed py-6">
            ${issue.description}
        </p>

        <div class="grid grid-cols-2 gap-8 bg-[#F8FAFC] rounded-lg p-4">
            <div>
                <p class="text-xs font-semibold text-[#64748B] uppercase mb-2">Assignee:</p>
                <p id="modal-assignee" class="text-[#1F2937] font-medium">${issue.assignee || 'None'}</p>
            </div>
            <div>
                <p class="text-xs font-semibold text-[#64748B] uppercase mb-2">Priority:</p>
                <span id="modal-priority"
                    class="${priorityStyle} px-4 py-1 rounded-full text-xs font-bold uppercase">
                    ${issue.priority}
                </span>
            </div>
        </div>
    `;

    document.getElementById("issue_modal").showModal();
};

const displayIssues = (issues) => {
    const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";

    // priority colors
    const priorityStyles = {
        high: {
            bg: 'bg-[#FEECEC]',
            text: 'text-[#EF4444]'
        },
        medium: {
            bg: 'bg-[#FFF6D1]',
            text: 'text-[#F59E0B]'
        },
        low: {
            bg: 'bg-[#EEEFF2]',
            text: 'text-[#9CA3AF]'
        }
    };


    issues.forEach(issue => {
        const card = document.createElement("div");

        // Priority bage select
        const style = priorityStyles[issue.priority.toLowerCase()] || priorityStyles.low;

        // Card border color select
        const borderColorClass = issue.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]';

        // card design
        card.className = `bg-white rounded border-t-4 ${borderColorClass} shadow-md`;

        card.innerHTML = `
    <div onclick="loadIssueDetail(${issue.id})" class="p-4 space-y-3 border-b border-[#E4E4E7]">
        <div class="flex justify-between items-center">
            <img class="h-full" src="./assets/${issue.status === 'open' ? 'Open-Status.png' : 'Closed-Status.png'}" alt="">
            
            <div class="${style.bg} ${style.text} rounded-full py-[6px] px-[25px] font-medium text-xs uppercase">
                ${issue.priority}
            </div>
        </div>
        
        <div>
            <h2 class="text-sm font-semibold text-[#1F2937]">${issue.title}</h2>
            <p class="text-xs text-[#64748B]">${issue.description.slice(0, 70)}...</p>
        </div>
        
        <div class="flex justify-start gap-1">
            ${issue.labels.map(label => `
                <div class="flex gap-[2px] items-center rounded-full bg-[#EFF6FF] border border-[#BFDBFE] py-[4px] px-2">
                    <p class="text-[10px] font-medium text-[#3B82F6] uppercase">${label}</p>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="text-xs text-[#64748B] p-4">
        <p>#${issue.id} by ${issue.author}</p>
        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
    </div>
`;
        issueContainer.append(card);
    });
};

const updateCount = (count) => {
    const countElement = document.getElementById("issue-count");
    if (countElement) countElement.innerText = `${count}`;
};

// Buttons click handler
const buttons = document.querySelectorAll(".button");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("bg-[#4A00FF]", "text-white"));
        btn.classList.add("bg-[#4A00FF]", "text-white");

        const status = btn.innerText.toLowerCase();
        const filtered = status === "all" ? allData : allData.filter(item => item.status === status);

        displayIssues(filtered);
        updateCount(filtered.length);
    });
});

loadIssues();

// Search function
document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("searchInput");
    const searchValue = input.value.trim();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            const searchResult = data.data;
            displayIssues(searchResult);
            updateCount(searchResult.length);
        })
});


document.getElementById("searchInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("btn-search").dispatchEvent(new Event('click'));
    }
});