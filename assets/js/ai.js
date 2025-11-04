
const $ = (s)=>document.querySelector(s);
function saveJSON(name, obj){
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
}
const deck=[]; function addCard(){ const q=$('#q').value.trim(), a=$('#a').value.trim(); if(!q||!a) return; deck.push({q,a}); $('#q').value=''; $('#a').value=''; renderDeck(); }
function renderDeck(){ $('#deck').innerHTML = deck.map((c,i)=>`<div class='card p-3 rounded-lg'><b>Q${i+1}:</b> ${c.q}<br><span class='text-slate-300/90'>Ans:</span> ${c.a}</div>`).join(''); $('#deckCount').textContent=deck.length; }
function exportDeck(){ saveJSON('flashcards.json', deck); }
function importDeckFile(files){ const f=files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ try{ const d=JSON.parse(r.result); deck.length=0; deck.push(...d); renderDeck(); }catch(e){ alert('Invalid JSON'); } }; r.readAsText(f); }
const quiz={title:'Untitled Quiz',items:[]}; function addMCQ(){ const q=$('#mcqQ').value.trim(); const opts=[$('#mcqA').value,$('#mcqB').value,$('#mcqC').value,$('#mcqD').value].map(s=>s.trim()); const correct=$('#mcqCorrect').value; if(!q||opts.some(o=>!o)) return; quiz.items.push({type:'mcq',q,opts,correct}); ['#mcqQ','#mcqA','#mcqB','#mcqC','#mcqD'].forEach(sel=>{$(sel).value=''}); renderQuiz(); }
function renderQuiz(){ $('#quizOut').innerHTML = quiz.items.map((it,i)=>`<div class='card p-3 rounded-lg'><b>Q${i+1}:</b> ${it.q}<ol class='list-decimal ml-6'>${it.opts.map(o=>`<li>${o}</li>`).join('')}</ol><div class='text-slate-400 text-sm'>Answer: ${'ABCD'[it.correct]}</div></div>`).join(''); $('#quizCount').textContent=quiz.items.length; }
function exportQuiz(){ saveJSON('quiz.json', quiz); }
async function loadNote(name){ const res=await fetch('content/'+name+'.md'); if(!res.ok){ $('#note').textContent='Note not found.'; return; } const md=await res.text(); $('#note').innerHTML = md.replace(/^# (.*$)/gim,'<h1 class="text-2xl font-extrabold mb-2">$1</h1>').replace(/^## (.*$)/gim,'<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>').replace(/^- (.*$)/gim,'<li>$1</li>').replace(/\n\n/g,'<br/>');
}
function pubmed(){ const q=encodeURIComponent($('#pubq').value.trim()); if(!q) return; window.open(`https://pubmed.ncbi.nlm.nih.gov/?term=${q}`,'_blank'); }
