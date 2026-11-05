/* Clean JAZB navigation: hover/focus desktop; first tap opens submenu on touch. */
(()=>{
 const items=[...document.querySelectorAll('.nav-item.has-menu')];
 const close=()=>{for(const item of items){item.classList.remove('is-open');const b=item.querySelector('.nav-toggle');if(b)b.setAttribute('aria-expanded','false')}};
 for(const item of items){
  const link=item.querySelector(':scope > a');
  link.setAttribute('aria-haspopup','true');
  link.addEventListener('click',event=>{
   const touch=window.matchMedia('(hover: none), (pointer: coarse)').matches;
   if(!touch)return;
   if(!item.classList.contains('is-open')){event.preventDefault();close();item.classList.add('is-open')}
  });
 }
 document.addEventListener('click',event=>{if(!event.target.closest('.nav-item.has-menu'))close()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
})();
