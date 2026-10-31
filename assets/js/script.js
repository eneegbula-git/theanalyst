(function(){
const d=portfolioData,$=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ul=a=>'<ul>'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>',chips=a=>'<ul class="chips">'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
$('#brand').textContent=d.name;$('#h-name').textContent=d.name;$('#h-title').textContent=d.title;$('#h-tag').textContent=d.tagline;$('#h-bio').textContent=d.bio;$('#h-loc').textContent=d.location;
$('#h-cv').textContent=d.resumeText;$('#h-photo').src=d.photo;$('#a-years').textContent=d.experienceYears;
$('#a-text').innerHTML=[d.bio].concat(d.about).map(p=>'<p>'+esc(p)+'</p>').join('');
document.querySelectorAll('[data-bind]').forEach(a=>a.href=d[a.dataset.bind]);
$('#exp').innerHTML=experience.map(j=>`<article class="job reveal"><p class="dates">${esc(j.dates)} · ${esc(j.location)}</p><h3>${esc(j.role)}</h3><p class="co">${esc(j.company)}</p><p>${esc(j.description)}</p><h4>Achievements</h4>${ul(j.achievements)}<h4>Business impact</h4><p>${esc(j.impact)}</p><details><summary>Key responsibilities</summary>${ul(j.responsibilities)}</details>${chips(j.tools)}</article>`).join('');
$('#comp').innerHTML=Object.entries(competencies).map(([k,v])=>`<div class="card reveal"><h3>${esc(k)}</h3>${chips(v)}</div>`).join('');
$('#proj').innerHTML=projects.map((p,i)=>`<article class="card pcard reveal"><div class="thumb"><img src="${esc(p.image)}" alt="${esc(p.name)} preview" loading="lazy" onerror="this.remove()"></div><div class="pbody"><p class="cat">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p>${esc(p.short)}</p><p><strong>Tools:</strong> ${esc(p.tools.join(', '))}</p>${chips(p.skills)}<button class="btn" data-i="${i}">View Case Study</button></div></article>`).join('');
document.querySelectorAll('.thumb').forEach((t,i)=>{if(!t.querySelector('img'))t.textContent=projects[i].category;});
document.querySelectorAll('.thumb img').forEach(im=>im.addEventListener('error',()=>{const t=im.parentNode;t.textContent=projects[[...document.querySelectorAll('.thumb')].indexOf(t)].category}));
$('#clist').innerHTML=[['Email','mailto:'+d.email,d.email],['Phone','tel:'+d.phone,d.phone],['LinkedIn',d.linkedin,d.linkedin],['GitHub',d.github,d.github],['Location','',d.location]].map(r=>`<li><span>${r[0]}</span>${r[1]?`<a href="${esc(r[1])}"${r[1].startsWith('http')?' target="_blank" rel="noopener"':''}>${esc(r[2])}</a>`:esc(r[2])}</li>`).join('');
$('#foot').textContent='© '+new Date().getFullYear()+' '+d.name;
/* case study modal */
const modal=$('#modal');let last;
function step(t,b){return b?`<div class="step"><h3>${t}</h3>${b}</div>`:''}
document.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const p=projects[b.dataset.i];last=b;
 const links=[['Supporting document',p.document],['GitHub',p.github],['Dashboard',p.dashboard]].filter(l=>l[1]).map(l=>`<a class="btn" href="${esc(l[1])}" target="_blank" rel="noopener">${l[0]}</a>`).join(' ');
 $('#mbody').innerHTML=`<p class="cat">${esc(p.category)} · ${esc(p.role)}</p><h2 id="m-title">${esc(p.name)}</h2>${chips(p.tools)}`+
 step('Business problem','<p>'+esc(p.problem)+'</p>')+step('Objective','<p>'+esc(p.objective)+'</p>')+step('Approach','<p>Methodology: '+esc(p.skills.join(', '))+'.<br>Data source: '+esc(p.dataSource)+'</p>')+
 step('Analysis',ul(p.analysis))+step('Findings (to be verified)',ul(p.findings))+step('Recommendations',ul(p.recommendations))+step('Outcome','<p>'+esc(p.outcome)+'</p>')+step('Business impact','<p>'+esc(p.impact)+'</p>')+(links?'<p>'+links+'</p>':'');
 modal.hidden=false;document.body.style.overflow='hidden';$('#close').focus();});
function closeM(){modal.hidden=true;document.body.style.overflow='';if(last)last.focus()}
$('#close').onclick=closeM;modal.addEventListener('click',e=>{if(e.target===modal)closeM()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeM()});
/* nav */
const burger=$('#burger'),links=$('#links');
burger.onclick=()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
links.addEventListener('click',e=>{if(e.target.tagName==='A'){links.classList.remove('open');burger.setAttribute('aria-expanded',false)}});
$('#theme').onclick=()=>{const r=document.documentElement,dark=getComputedStyle(r).getPropertyValue('--bg').trim()==='#0f1115',n=dark?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}};
/* reveal */
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const o=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target)}}),{threshold:.08});els.forEach(x=>o.observe(x))}else els.forEach(x=>x.classList.add('in'));
/* form */
const f=$('#form'),st=$('#status'),send=$('#send');f.action=d.formspreeEndpoint;
const msgs={n:'Please enter your name.',e:'Please enter a valid email address.',s:'Please enter a subject.',m:'Please enter a message.'};
function valid(){let ok=true;['n','e','s','m'].forEach(k=>{const i=$('#'+k),bad=!i.value.trim()||!i.checkValidity();i.setAttribute('aria-invalid',bad);i.setAttribute('aria-describedby','e-'+k);$('#e-'+k).textContent=bad?msgs[k]:'';if(bad)ok=false});return ok}
f.addEventListener('submit',async e=>{e.preventDefault();st.className='';st.textContent='';if(!valid())return;send.disabled=true;send.textContent='Sending…';
 try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
  if(r.ok){f.reset();st.className='ok';st.textContent='Thank you, your message has been sent.'}else throw 0}
 catch(x){st.className='bad';st.textContent='Sorry, something went wrong. Please try again or email '+d.email+'.'}
 send.disabled=false;send.textContent='Send message'});
})();
