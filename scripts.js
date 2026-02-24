// ===== In-App Browser Detection =====
(function () {
  const ua = navigator.userAgent || "";
  const isInAppBrowser =
    /FBAN|FBAV|FB_IAB|Instagram|Musical\.ly|TikTok|Twitter|Snapchat|LinkedInApp|WhatsApp|Telegram|Pinterest|Line\/|MicroMessenger|GSA\//i.test(
      ua
    ) ||
    // Android WebView in-app generic check
    (/Android/i.test(ua) && /wv\)/i.test(ua) && /Version\//i.test(ua));

  if (!isInAppBrowser) return;

  const overlay = document.getElementById("inappOverlay");
  if (!overlay) return;
  overlay.classList.add("active");

  // زر "افتح في المتصفح"
  document
    .getElementById("inappOpenBtn")
    .addEventListener("click", function () {
      const url = location.href;

      // محاولة 1: intent:// لأجهزة Android (يعمل على Facebook/Instagram)
      if (/Android/i.test(ua)) {
        const intentUrl =
          "intent://" +
          url.replace(/^https?:\/\//, "") +
          "#Intent;scheme=https;action=android.intent.action.VIEW;end";
        location.href = intentUrl;
        return;
      }

      // محاولة 2: window.open (يعمل على بعض المتصفحات)
      try {
        window.open(url, "_blank");
      } catch (e) {}

      // محاولة 3: نسخ الرابط للمستخدم مع تعليمات
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(url)
          .then(function () {
            alert(
              "📋 تم نسخ الرابط!\nافتح متصفح Chrome أو Safari والصق الرابط لفتح الصفحة."
            );
          })
          .catch(function () {
            prompt("انسخ الرابط وافتحه في متصفحك:", url);
          });
      } else {
        prompt("انسخ الرابط وافتحه في متصفحك:", url);
      }
    });

  // زر "تجاهل والمتابعة"
  document
    .getElementById("inappSkipBtn")
    .addEventListener("click", function () {
      overlay.classList.remove("active");
    });
})();

// ===== Main App =====
const username = document.getElementById("username-input");

if (InitialState && InitialState?.UserName) {
  username.value = InitialState.UserName;
  document.getElementById("championName").textContent = "test";
  document.getElementById("username-preview").textContent = username.value;
  document.getElementById("startup").disabled = false;
}
function saveUserName(e) {
  localStorage.setItem("UserName", e.target.value);
  InitialState.UserName = e.target.value;
  document.getElementById("username-preview").textContent = e.target.value;
  document.getElementById("startup").disabled = e.target.value ? false : true;
}
function SetInitialData() {
  const {
    LeagueName,
    Investor,
    Description,
    Investor2,
    Investor3,
    Supervisor,
  } = InitialState || {};
  if (Investor) {
    const AllTags = document.querySelectorAll(".investor-name");
    const AllTagsNone = document.querySelectorAll(".investor-name-none");
    [...AllTags, ...AllTagsNone].forEach((tag) => {
      tag.textContent = Investor;
    });
  }
  if (Investor2) {
    const AllTags = document.querySelectorAll(".investor-name-2");
    AllTags.forEach((tag) => {
      tag.textContent = Investor2;
    });
  }
  if (Investor3) {
    const AllTags = document.querySelectorAll(".investor-name-3");
    AllTags.forEach((tag) => {
      tag.textContent = Investor3;
    });
  }
  if (Supervisor) {
    const AllTags = document.querySelectorAll(".supervisor-name");
    AllTags.forEach((tag) => {
      tag.textContent = Supervisor;
    });
  }
  if (Description) {
    const AllTags = document.querySelectorAll(".investor-description");
    const AllTagsNone = document.querySelectorAll(".investor-description-none");
    [...AllTags, ...AllTagsNone].forEach((tag) => {
      tag.textContent = Description;
    });
  }
  if (LeagueName) {
    const AllTags = document.querySelectorAll(".main-title");
    const LeagueNameTags = document.querySelectorAll(".league-name");
    [...AllTags, ...AllTags].forEach((tag) => {
      tag.textContent = LeagueName;
    });
    document.title = LeagueName;
  }
}

// username.addEventListener("change", saveUserName)
// Particles
function createParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 15 + 15 + "s";
    particle.style.animationDelay = Math.random() * 15 + "s";
    container.appendChild(particle);
  }
}
createParticles();

// Data
const groups = {
  A: {
    name: "المجموعة الأولى",
    teams: ["الفرسان", "الأجيال", "النور", "الهلال", "المختلط"],
  },
  B: {
    name: "المجموعة الثانية",
    teams: ["الأحلام", "محمد عبودة", "الملكي", "بلاك ستار", "القراصنة"],
  },
  C: {
    name: "المجموعة الثالثة",
    teams: ["الفراعنة", "أصدقاء العمدة", "الملوك", "ملوك الجدعنة", "الأبطال"],
  },
  D: {
    name: "المجموعة الرابعة",
    teams: ["الطواحين", "الحفرة", "ديار مكة", "الكابيتانو", "البلوز"],
  },
};

// State
const state = {
  currentScreen: "startup",
  //   currentScreen: "screen-results",
  groupSelections: {
    A: { first: null, second: null },
    B: { first: null, second: null },
    C: { first: null, second: null },
    D: { first: null, second: null },
  },
  quarterFinals: { match1: null, match2: null, match3: null, match4: null },
  semiFinals: { match1: null, match2: null },
  final: { winner: null },
};

const screens = [
  "startup",
  "groupA",
  "groupB",
  "groupC",
  "groupD",
  "quarter",
  "semi",
  "final",
  "results",
];
const screenLabels = {
  startup: "اسم المشارك",
  groupA: "المجموعة الأولى",
  groupB: "المجموعة الثانية",
  groupC: "المجموعة الثالثة",
  groupD: "المجموعة الرابعة",
  quarter: "دور الثمانية",
  semi: "نصف النهائي",
  final: "النهائي",
  results: "النتيجة",
};

// Init
function init() {
  ["A", "B", "C", "D"].forEach(renderGroup);
  setupNavigation();
  updateProgress();
  SetInitialData();
}

function renderGroup(code) {
  const container = document.getElementById(`teams${code}`);
  container.innerHTML = groups[code].teams
    .map(
      (team) => `
                <div class="team-card" data-team="${team}" onclick="selectTeam('${code}', '${team}')">
                    <span>${team}</span>
                    <i class="fas fa-circle-check rank-icon" style="display:none;"></i>
                </div>
            `
    )
    .join("");
}

function selectTeam(code, team) {
  const sel = state.groupSelections[code];
  if (sel.first === team) {
    sel.first = sel.second;
    sel.second = null;
  } else if (sel.second === team) {
    sel.second = null;
  } else if (!sel.first) {
    sel.first = team;
  } else if (!sel.second) {
    sel.second = team;
  } else {
    sel.second = team;
  }
  updateGroupUI(code);
}

function updateGroupUI(code) {
  const container = document.getElementById(`teams${code}`);
  const sel = state.groupSelections[code];
  container.querySelectorAll(".team-card").forEach((card) => {
    const team = card.dataset.team;
    const icon = card.querySelector(".rank-icon");
    card.classList.remove("first", "second");
    icon.style.display = "none";
    if (sel.first === team) {
      card.classList.add("first");
      icon.style.display = "inline";
      icon.className = "fas fa-trophy rank-icon";
    } else if (sel.second === team) {
      card.classList.add("second");
      icon.style.display = "inline";
      icon.className = "fas fa-medal rank-icon";
    }
  });
  document.getElementById(`first${code}`).textContent = `الأول: ${
    sel.first || "--"
  }`;
  document.getElementById(`second${code}`).textContent = `الثاني: ${
    sel.second || "--"
  }`;
  document.getElementById(`next${code}`).disabled = !(sel.first && sel.second);
}

function setupNavigation() {
  document.getElementById("startup").onclick = () => goToScreen("groupA");
  document.getElementById("nextA").onclick = () => goToScreen("groupB");
  document.getElementById("prevA").onclick = () => goToScreen("startup");
  document.getElementById("prevB").onclick = () => goToScreen("groupA");
  document.getElementById("nextB").onclick = () => goToScreen("groupC");
  document.getElementById("prevC").onclick = () => goToScreen("groupB");
  document.getElementById("nextC").onclick = () => goToScreen("groupD");
  document.getElementById("prevD").onclick = () => goToScreen("groupC");
  document.getElementById("nextD").onclick = () => {
    generateQuarterFinals();
    goToScreen("quarter");
  };
  document.getElementById("prevQuarter").onclick = () => goToScreen("groupD");
  document.getElementById("nextQuarter").onclick = () => {
    generateSemiFinals();
    goToScreen("semi");
  };
  document.getElementById("prevSemi").onclick = () => goToScreen("quarter");
  document.getElementById("nextSemi").onclick = () => {
    generateFinal();
    goToScreen("final");
  };
  document.getElementById("prevFinal").onclick = () => goToScreen("semi");
  document.getElementById("nextFinal").onclick = () => {
    generateResults();
    goToScreen("results");
  };
  document.getElementById("btnDownload").onclick = downloadImage;
  document.getElementById("btnFacebook").onclick = shareImage;
  document.getElementById("btnRestart").onclick = restart;
}

function goToScreen(name) {
  if (state.currentScreen == "startup" && !InitialState?.UserName) {
    return;
  }
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(`screen-${name}`).classList.add("active");
  state.currentScreen = name;
  updateProgress();
  document
    .querySelector(".app-container")
    .scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress() {
  const idx = screens.indexOf(state.currentScreen);
  const pct = ((idx + 1) / screens.length) * 100;
  document.getElementById("progressFill").style.width = `${pct}%`;
  document.getElementById("progressLabel").textContent =
    screenLabels[state.currentScreen];
  document.getElementById("progressCount").textContent = `${idx + 1} / ${
    screens.length
  }`;
  document.querySelectorAll(".step-dot").forEach((dot, i) => {
    dot.classList.remove("active", "completed");
    if (i < idx) dot.classList.add("completed");
    else if (i === idx) dot.classList.add("active");
  });
}

function generateQuarterFinals() {
  const sel = state.groupSelections;
  const matches = [
    { id: "match1", t1: sel.A.first, t2: sel.C.second },
    { id: "match2", t1: sel.C.first, t2: sel.A.second },
    { id: "match3", t1: sel.B.first, t2: sel.D.second },
    { id: "match4", t1: sel.D.first, t2: sel.B.second },
  ];
  document.getElementById("quarterMatches").innerHTML = matches
    .map(
      (m) => `
                <div class="match-card">
                    <div class="match-teams">
                        <div class="match-team" data-match="${m.id}" data-team="${m.t1}" onclick="selectQF('${m.id}','${m.t1}')">
                            <i class="fas fa-check-circle" style="display:none;"></i>
                            ${m.t1}
                        </div>
                        <div class="vs-divider">VS</div>
                        <div class="match-team" data-match="${m.id}" data-team="${m.t2}" onclick="selectQF('${m.id}','${m.t2}')">
                            <i class="fas fa-check-circle" style="display:none;"></i>
                            ${m.t2}
                        </div>
                    </div>
                </div>
            `
    )
    .join("");
}

function selectQF(matchId, team) {
  state.quarterFinals[matchId] = team;
  updateMatchUI("quarterMatches", matchId, team);
  const qf = state.quarterFinals;
  document.getElementById("nextQuarter").disabled = !(
    qf.match1 &&
    qf.match2 &&
    qf.match3 &&
    qf.match4
  );
}

function generateSemiFinals() {
  const qf = state.quarterFinals;
  const matches = [
    { id: "match1", t1: qf.match1, t2: qf.match2 },
    { id: "match2", t1: qf.match3, t2: qf.match4 },
  ];
  document.getElementById("semiMatches").innerHTML = matches
    .map(
      (m) => `
                <div class="match-card">
                    <div class="match-teams">
                        <div class="match-team" data-match="${m.id}" data-team="${m.t1}" onclick="selectSF('${m.id}','${m.t1}')">
                            <i class="fas fa-check-circle" style="display:none;"></i>
                            ${m.t1}
                        </div>
                        <div class="vs-divider">VS</div>
                        <div class="match-team" data-match="${m.id}" data-team="${m.t2}" onclick="selectSF('${m.id}','${m.t2}')">
                            <i class="fas fa-check-circle" style="display:none;"></i>
                            ${m.t2}
                        </div>
                    </div>
                </div>
            `
    )
    .join("");
}

function selectSF(matchId, team) {
  state.semiFinals[matchId] = team;
  updateMatchUI("semiMatches", matchId, team);
  const sf = state.semiFinals;
  document.getElementById("nextSemi").disabled = !(sf.match1 && sf.match2);
}

function generateFinal() {
  const sf = state.semiFinals;
  document.getElementById("finalMatch").innerHTML = `
                <div class="match-card final-match">
                    <div class="match-teams">
                        <div class="match-team" data-match="final" data-team="${sf.match1}" onclick="selectFinal('${sf.match1}')">
                            <i class="fas fa-crown" style="display:none;"></i>
                            ${sf.match1}
                        </div>
                        <div class="vs-divider">VS</div>
                        <div class="match-team" data-match="final" data-team="${sf.match2}" onclick="selectFinal('${sf.match2}')">
                            <i class="fas fa-crown" style="display:none;"></i>
                            ${sf.match2}
                        </div>
                    </div>
                </div>
            `;
}

function selectFinal(team) {
  state.final.winner = team;
  updateMatchUI("finalMatch", "final", team);
  document.getElementById("nextFinal").disabled = false;
}

function updateMatchUI(containerId, matchId, winner) {
  const container = document.getElementById(containerId);
  container.querySelectorAll(`[data-match="${matchId}"]`).forEach((el) => {
    const icon = el.querySelector("i");
    el.classList.remove("winner", "loser");
    icon.style.display = "none";
    if (el.dataset.team === winner) {
      el.classList.add("winner");
      icon.style.display = "inline";
    } else {
      el.classList.add("loser");
    }
  });
}

function generateResults() {
  const sel = state.groupSelections;
  const qf = state.quarterFinals;
  const sf = state.semiFinals;

  document.getElementById("championName").textContent = state.final.winner;
  document.getElementById("groupsResults").innerHTML = ["A", "B", "C", "D"]
    .map(
      (c) => `
                <div class="group-result-card">
                    <h4><i class="fas fa-users"></i> ${groups[c].name}</h4>
                    <p><i class="fas fa-trophy" style="color:#FFD700;"></i> ${sel[c].first}</p>
                    <p><i class="fas fa-medal" style="color:#C0C0C0;"></i> ${sel[c].second}</p>
                </div>
            `
    )
    .join("");

  document.getElementById("quarterResults").innerHTML = [
    { t1: sel.A.first, t2: sel.C.second, w: qf.match1 },
    { t1: sel.C.first, t2: sel.A.second, w: qf.match2 },
    { t1: sel.B.first, t2: sel.D.second, w: qf.match3 },
    { t1: sel.D.first, t2: sel.B.second, w: qf.match4 },
  ]
    .map(
      (m) => `
                <div class="match-result-item">
                    <span class="teams">${m.t1} vs ${m.t2}</span>
                    <span class="winner"><i class="fas fa-check"></i> ${m.w}</span>
                </div>
            `
    )
    .join("");

  document.getElementById("semiResults").innerHTML = [
    { t1: qf.match1, t2: qf.match2, w: sf.match1 },
    { t1: qf.match3, t2: qf.match4, w: sf.match2 },
  ]
    .map(
      (m) => `
                <div class="match-result-item">
                    <span class="teams">${m.t1} vs ${m.t2}</span>
                    <span class="winner"><i class="fas fa-check"></i> ${m.w}</span>
                </div>
            `
    )
    .join("");

  document.getElementById("finalResults").innerHTML = `
                <div class="match-result-item">
                    <span class="teams">${sf.match1} vs ${sf.match2}</span>
                    <span class="winner"><i class="fas fa-crown"></i> ${state.final.winner}</span>
                </div>
            `;
}

/**
 * html2canvas لا يدعم linear-gradient مع background-clip: text
 * الحل: نستخدم onclone لتعديل العناصر في النسخة المؤقتة قبل التصوير فقط
 */
function fixGradientTextForCanvas(clonedDoc) {
  const selectors = [
    ".main-title",
    ".results-title",
    ".investor-container",
    ".investor-container .investor-name-2",
  ];
  selectors.forEach((sel) => {
    clonedDoc.querySelectorAll(sel).forEach((el) => {
      el.style.webkitTextFillColor = "";
      el.style.webkitBackgroundClip = "";
      el.style.backgroundClip = "";
      el.style.background = "none";
      el.style.color = "#F7B733";
    });
  });
}

async function downloadImage() {
  const loading = document.getElementById("loadingOverlay");
  loading.classList.add("active");
  try {
    const canvas = await html2canvas(
      document.getElementById("resultsContent"),
      {
        backgroundColor: "#0a0a1a",
        scale: 2,
        useCORS: true,
        onclone: (clonedDoc) => fixGradientTextForCanvas(clonedDoc),
      }
    );
    const link = document.createElement("a");
    link.download = "توقعاتي-للبطولة.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (e) {
    alert("حدث خطأ");
  }
  loading.classList.remove("active");
}

async function shareImage() {
  const loading = document.getElementById("loadingOverlay");
  loading.classList.add("active");
  try {
    const canvas = await html2canvas(
      document.getElementById("resultsContent"),
      {
        backgroundColor: "#0a0a1a",
        scale: 2,
        useCORS: true,
        onclone: (clonedDoc) => fixGradientTextForCanvas(clonedDoc),
      }
    );
    canvas.toBlob(async (blob) => {
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], "توقعاتي.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: "توقعاتي للبطولة", files: [file] });
          loading.classList.remove("active");
          return;
        }
      }
      const link = document.createElement("a");
      link.download = "توقعاتي-للبطولة.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      alert("تم حفظ الصورة!");
      loading.classList.remove("active");
    });
  } catch (e) {
    loading.classList.remove("active");
  }
}

function restart() {
  state.groupSelections = {
    A: { first: null, second: null },
    B: { first: null, second: null },
    C: { first: null, second: null },
    D: { first: null, second: null },
  };
  state.quarterFinals = {
    match1: null,
    match2: null,
    match3: null,
    match4: null,
  };
  state.semiFinals = { match1: null, match2: null };
  state.final = { winner: null };
  ["A", "B", "C", "D"].forEach((c) => {
    renderGroup(c);
    document.getElementById(`first${c}`).textContent = "الأول: --";
    document.getElementById(`second${c}`).textContent = "الثاني: --";
    document.getElementById(`next${c}`).disabled = true;
  });
  goToScreen("startup");
}

init();
