import {QUESTIONS,isComplete,calculateScores,leadingIndices} from './core.js';
const $ = id => document.getElementById(id);
const escape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const PATTERNS = [
 {name:'達成支配欲求',description:'自分の力で成果を生み出し、人を率いたり、影響力を発揮したりすることを大切にする傾向です。',traits:'自力本願、成功志向、リーダー志向。プロセスよりも結果に意識が向きやすい傾向。',up:['達成すべき目標が明確になっている','具体的なライバルがいる','自分の影響力の大きさを実感できる'],down:['権利や権限が小さくなる','周囲が目的や業績に意識を向けていない','周囲の姿勢がネガティブである']},
 {name:'アナライズ欲求',description:'物事を深く分析し、根拠や仕組みを理解し、納得してから動くことを大切にする傾向です。',traits:'分析、追求、真理究明。複雑なことを考え、納得してから行動する傾向。',up:['知識や経験が評価される','自尊心が満たされる','関心のあることを探求する機会がある'],down:['指示や期待に論理的な一貫性がない','曖昧でおおざっぱな環境に置かれる','非生産的な会議が続く']},
 {name:'貢献奉仕欲求',description:'人の役に立つこと、良い関係を保つことや、周囲への貢献を大切にする傾向です。',traits:'他者への貢献、良い人間関係の維持、プロセスを重視。葛藤を避けようとする傾向。',up:['周囲から頼られたり、相談されたりする','自分の貢献に感謝してもらえる','励ましの言葉を受け取る'],down:['自分の貢献に周囲が無関心である','不誠実な対応を受ける']},
 {name:'クリエイティブ欲求',description:'自分の個性や感性を生かし、新しいアイデアを自由に表現することを大切にする傾向です。',traits:'想像力、感覚・感性、表現、個性、自由、創意工夫を重視する傾向。',up:['独創性を期待される','新しいアイデアに注目が集まる','達成する手段を自分に任せてもらえる'],down:['煩雑なルールに縛られる','形だけのルールを求められる','細かい指導が続く']}
];
let answers = QUESTIONS.map(() => ({first:null,second:null}));
let current = 0;
function show(section) {
 for (const id of ['intro','quiz','results']) $(id).hidden = id !== section;
 window.scrollTo({top:0,behavior:'instant'});
}
function renderNav() {
 $('question-nav').innerHTML = QUESTIONS.map((q,i) => `<button type="button" data-question="${i}" class="${i === current ? 'current ' : ''}${isComplete(answers[i]) ? 'complete' : ''}" ${i === current ? 'aria-current="step"' : ''} aria-label="質問${i+1}、${isComplete(answers[i]) ? '回答済み' : '未回答'}">${i+1}</button>`).join('');
}
function refreshSelection() {
 const answer = answers[current];
 document.querySelectorAll('#options input').forEach(input => {
  const value = Number(input.value);
  const rank = input.name;
  input.checked = answer[rank] === value;
  input.disabled = answer[rank === 'first' ? 'second' : 'first'] === value;
 });
 document.querySelectorAll('.option').forEach((el,i) => el.classList.toggle('selected',answer.first === i || answer.second === i));
 const count = answers.filter(isComplete).length;
 $('completion').textContent = `${count} / 12問 回答済み`;
 $('progress-fill').style.width = `${count/12*100}%`;
 $('next').disabled = !isComplete(answer);
 $('next').textContent = current === 11 ? (count === 12 ? '結果を見る ↗' : '未回答の質問へ →') : '次の質問 →';
 $('selection-status').textContent = isComplete(answer) ? '2つ選べました。次へ進めます。' : answer.first === null && answer.second === null ? '◎ と ○ を1つずつ選んでください。' : answer.first === null ? '◎ 最も近いものを選んでください。' : '○ 次に近いものを選んでください。';
 $('clear-question').disabled = answer.first === null && answer.second === null;
 renderNav();
}
function renderQuestion(focus = true) {
 const question = QUESTIONS[current];
 $('question-number').textContent = `QUESTION ${String(current+1).padStart(2,'0')} / 12`;
 $('question-title').textContent = question.title;
 $('options').innerHTML = question.options.map((text,i) => `<div class="option"><div class="option-text" id="option-${i}"><span class="option-letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${escape(text)}</span></div><div class="rank first"><input type="radio" name="first" value="${i}" id="first-${i}" aria-label="最も近い：${escape(text)}"><label for="first-${i}" aria-hidden="true">◎</label></div><div class="rank second"><input type="radio" name="second" value="${i}" id="second-${i}" aria-label="次に近い：${escape(text)}"><label for="second-${i}" aria-hidden="true">○</label></div></div>`).join('');
 $('previous').disabled = current === 0;
 refreshSelection();
 if(focus) $('question-title').focus({preventScroll:true});
}
function chart(scores) {
 const center = [280,240], r = 136;
 const coords = [[0,-1],[1,0],[0,1],[-1,0]];
 const points = values => values.map((v,i) => `${center[0]+coords[i][0]*r*v/24},${center[1]+coords[i][1]*r*v/24}`).join(' ');
 const desc = PATTERNS.map((p,i) => `${p.name}${scores[i]}点`).join('、');
 return `<svg viewBox="0 0 560 480" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">4つの欲求の得点グラフ</title><desc id="chart-desc">各軸の最大24点。${desc}。</desc>
 <g fill="none" stroke="#dce5d9">${[6,12,18,24].map(v=>`<polygon points="${points([v,v,v,v])}"/>`).join('')}<path d="M280 104V376M144 240H416"/></g>
 <g font-family="sans-serif" font-size="10" fill="#7c8d7c">${[6,12,18,24].map(v=>`<text x="287" y="${240-r*v/24+4}">${v}</text>`).join('')}<text x="287" y="255">0</text></g>
 <polygon points="${points(scores)}" fill="#2d725b" fill-opacity=".19" stroke="#246453" stroke-width="2.5" stroke-linejoin="round"/>
 ${scores.map((v,i)=>`<circle cx="${center[0]+coords[i][0]*r*v/24}" cy="${center[1]+coords[i][1]*r*v/24}" r="5" fill="#246453" stroke="white" stroke-width="2"/>`).join('')}
 <g text-anchor="middle" fill="#183e3b" font-family="sans-serif"><text x="280" y="44" font-size="17" font-weight="600">達成支配欲求</text><text x="280" y="71" font-size="20">${scores[0]}<tspan font-size="11"> 点</tspan></text><text x="477" y="221" font-size="15" font-weight="600">アナライズ</text><text x="477" y="244" font-size="15" font-weight="600">欲求</text><text x="477" y="273" font-size="20">${scores[1]}<tspan font-size="11"> 点</tspan></text><text x="280" y="426" font-size="17" font-weight="600">貢献奉仕欲求</text><text x="280" y="453" font-size="20">${scores[2]}<tspan font-size="11"> 点</tspan></text><text x="80" y="221" font-size="14" font-weight="600">クリエイティブ</text><text x="80" y="244" font-size="15" font-weight="600">欲求</text><text x="80" y="273" font-size="20">${scores[3]}<tspan font-size="11"> 点</tspan></text></g></svg>`;
}
function renderResults() {
 const scores = calculateScores(answers);
 const leads = leadingIndices(scores);
 $('chart').innerHTML = chart(scores);
 $('leading-title').textContent = leads.map(i => PATTERNS[i].name).join('・');
 $('leading-description').textContent = leads.length === 4 ? '今回は4つの欲求が同じ得点でした。それぞれの説明を、自分の経験と照らしてみてください。' : leads.length > 1 ? 'これらの欲求が同じ得点で最も高く表れました。複数の欲求をあわせて見てみましょう。' : PATTERNS[leads[0]].description;
 $('score-list').innerHTML = PATTERNS.map((p,i) => `<div class="score-row"><div class="score-row-top"><span>${p.name}</span><b>${scores[i]}<small> / 24点</small></b></div><div class="score-track"><span style="width:${scores[i]/24*100}%"></span></div></div>`).join('');
 $('motivation-cards').innerHTML = PATTERNS.map((p,i) => `<article class="motivation-card ${leads.includes(i)?'strongest':''}"><div class="motivation-head"><h3>${p.name}</h3><span>${scores[i]}<small> 点</small></span></div><p>${p.traits}</p><h4 class="up">＋ モチベーションが上がる要因</h4><ul>${p.up.map(t=>`<li>${t}</li>`).join('')}</ul><h4 class="down">− モチベーションが下がる要因</h4><ul>${p.down.map(t=>`<li>${t}</li>`).join('')}</ul></article>`).join('');
 show('results');
 $('results-title').focus({preventScroll:true});
}
$('start').addEventListener('click',() => {show('quiz');renderQuestion();});
$('options').addEventListener('change',event => {
 const input = event.target;
 if(!(input instanceof HTMLInputElement)) return;
 const value = Number(input.value), rank = input.name;
 if(!['first','second'].includes(rank) || value === answers[current][rank==='first'?'second':'first']) return;
 answers[current][rank] = value;
 refreshSelection();
});
$('clear-question').addEventListener('click',() => {answers[current]={first:null,second:null};refreshSelection();$('first-0').focus();});
$('previous').addEventListener('click',() => {if(current>0){current--;renderQuestion();window.scrollTo({top:0,behavior:'instant'});}});
$('next').addEventListener('click',() => {
 if(!isComplete(answers[current]))return;
 if(current<11){current++;renderQuestion();window.scrollTo({top:0,behavior:'instant'});return;}
 if(answers.every(isComplete)){renderResults();return;}
 current = answers.findIndex(answer => !isComplete(answer));renderQuestion();window.scrollTo({top:0,behavior:'instant'});
});
$('question-nav').addEventListener('click',event => {const button=event.target.closest('button[data-question]');if(button){current=Number(button.dataset.question);renderQuestion();window.scrollTo({top:0,behavior:'instant'});}});
$('review').addEventListener('click',() => {current=0;show('quiz');renderQuestion();});
$('restart').addEventListener('click',() => {answers=QUESTIONS.map(()=>({first:null,second:null}));current=0;show('intro');$('start').focus({preventScroll:true});$('chart').innerHTML='';$('score-list').innerHTML='';$('motivation-cards').innerHTML='';});
