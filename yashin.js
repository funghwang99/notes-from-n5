(() => {
  if (window.__N5_YASHIN__) return;
  window.__N5_YASHIN__ = true;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n,a=0,b=1) => Math.min(b,Math.max(a,n));
  const prog = (el,start=.94,end=-.12) => {
    if (!el) return 0;
    const r=el.getBoundingClientRect(),vh=window.innerHeight||1;
    const from=vh*start,to=vh*end-r.height;
    return clamp((from-r.top)/Math.max(1,from-to));
  };
  const near = (el,pad=1.25) => {
    if (!el) return false;
    const r=el.getBoundingClientRect(),vh=window.innerHeight||1;
    return r.bottom>-vh*pad && r.top<vh*(1+pad);
  };
  const hero=document.querySelector('.ya-hero');
  const domain=document.querySelector('.ya-domain');
  const noOne=document.querySelector('.ya-no-one');
  const light=document.querySelector('.ya-light');
  const farewell=document.querySelector('.ya-farewell');
  const ending=document.querySelector('.ya-ending');
  let raf=0;
  const update=()=>{
    raf=0;
    if(hero&&near(hero,.4)) hero.style.setProperty('--ya-hero-p',(reduce?1:prog(hero,.98,.08)).toFixed(4));
    if(domain&&near(domain,.4)){
      const p=reduce?1:prog(domain,.99,-.02);
      const z=(a,b)=>clamp((p-a)/(b-a));
      domain.style.setProperty('--ya-z2',z(.08,.23).toFixed(3));
      domain.style.setProperty('--ya-z3',z(.22,.40).toFixed(3));
      domain.style.setProperty('--ya-z4',z(.39,.62).toFixed(3));
      domain.style.setProperty('--ya-z5',z(.60,.82).toFixed(3));
      domain.style.setProperty('--ya-domain-thesis',z(.76,.92).toFixed(3));
    }
    if(noOne&&near(noOne,.4)) noOne.style.setProperty('--ya-no-one-p',(reduce?1:prog(noOne,.92,.04)).toFixed(4));
    if(light&&near(light,.4)){
      const p=reduce?1:prog(light,.98,.02);
      light.style.setProperty('--ya-light-angle',(-18 + p*196).toFixed(2));
      light.style.setProperty('--ya-light-winner',clamp((p-.56)/.24).toFixed(3));
    }
    if(farewell&&near(farewell,.5)) farewell.style.setProperty('--ya-farewell-p',(reduce?1:prog(farewell,.9,.1)).toFixed(4));
    if(ending&&near(ending,.35)){
      const p=reduce?1:prog(ending,.99,.01);
      ending.style.setProperty('--ya-end-mid',clamp((p-.18)/.22).toFixed(3));
      ending.style.setProperty('--ya-end-collapse',clamp((p-.38)/.28).toFixed(3));
      ending.style.setProperty('--ya-end-trophy',clamp((p-.53)/.25).toFixed(3));
      ending.style.setProperty('--ya-end-name',clamp((p-.80)/.14).toFixed(3));
    }
  };
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
  schedule();
})();
