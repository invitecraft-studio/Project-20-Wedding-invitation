import {useState,useRef,useEffect,useMemo} from 'react'
import {motion,AnimatePresence,useScroll,useTransform,useMotionValue,useSpring,useInView} from 'framer-motion'
import {W} from './data'
const img=n=>`/img/${n}`
const E=[.2,.8,.2,1]
const K={
 clip:[{x:-70,opacity:0,skewX:-10},{x:0,opacity:1,skewX:0}],
 flip:[{rotateX:-90,opacity:0,y:40},{rotateX:0,opacity:1,y:0}],
 zoom:[{scale:.6,opacity:0,filter:'blur(12px)'},{scale:1,opacity:1,filter:'blur(0px)'}],
 rise:[{y:60,opacity:0,skewY:4},{y:0,opacity:1,skewY:0}]}
function R({k='rise',d=0,as='div',className,children}){const M=motion[as];return <M className={className} initial={K[k][0]} whileInView={K[k][1]} viewport={{once:true,margin:'-80px'}} transition={{duration:1.1,delay:d,ease:E}}>{children}</M>}
function L({t,d=0,go=true}){return <span className="ln" aria-label={t}>{[...t].map((c,i)=><motion.span key={i} aria-hidden="true" style={{display:'inline-block',whiteSpace:'pre'}} initial={{y:'115%',rotate:10,opacity:0}} animate={go?{y:0,rotate:0,opacity:1}:{}} transition={{delay:d+i*.06,duration:1,ease:E}}>{c}</motion.span>)}</span>}
const SHUT={
 doors:[{s:{left:0,width:'50.6%'},to:{x:'-101%'}},{s:{right:0,width:'50.6%'},to:{x:'101%'}}],
 curtain:[{s:{inset:0},to:{y:'-101%'}}],
 rise:[{s:{inset:0},to:{y:'101%'}}],
 diag:[{s:{inset:'0 -25%',skewX:-20},to:{x:'-135%'}}],
 iris:[{s:{left:'50%',top:'35%',width:'20vmax',height:'20vmax',marginLeft:'-10vmax',marginTop:'-10vmax',borderRadius:'50%',boxShadow:'0 0 0 200vmax #120d0a',background:'transparent'},from:{scale:.04},to:{scale:16}}]}
const Torana=()=><div className="tor" aria-hidden="true">{Array.from({length:15},(_,i)=><span key={i} className={i%3===1?'mari':'leaf'} style={{animationDelay:`${(i%5)*.45}s`}}/>)}</div>
function Sec({id,bg,tone=.6,pos='center',enter,fx,children,cls=''}){
 const r=useRef(null),on=useInView(r,{once:true,amount:.1}),sh=SHUT[enter]
 const {scrollYProgress:p}=useScroll({target:r,offset:['start end','end start']})
 const y=useTransform(p,[0,1],['-9%','9%']),s=useTransform(p,[0,.5,1],[1.22,1.1,1.22])
 return <section id={id} ref={r} className={'sec '+cls}>
  <div className="stage">
   <motion.div className="bg" style={{backgroundImage:`url(${img(bg)})`,backgroundPosition:pos,y,scale:s}}/>
   <div className="veil" style={{'--t':tone}}/>{fx}
   {sh&&sh.map((c,i)=><motion.i key={i} className="shut" style={c.s} initial={c.from||{x:0}} animate={on?c.to:(c.from||{x:0})} transition={{duration:1.7,ease:[.7,0,.2,1],delay:.1}}/>)}</div>
  <div className="in">{children}</div></section>}
function Muggu({cls}){const r=useRef(null),on=useInView(r,{once:true,amount:.3}),P='M60 60C47 42 47 20 60 6C73 20 73 42 60 60Z'
 return <svg ref={r} className={"muggu "+(cls||"")} viewBox="0 0 120 120" aria-hidden="true">
  {[0,45,90,135,180,225,270,315].map(a=><g key={a} transform={`rotate(${a} 60 60)`}><motion.path d={P} fill="none" stroke="#e3b56a" strokeWidth="1.5" initial={{pathLength:0}} animate={on?{pathLength:1}:{}} transition={{duration:2.2,delay:a/300}}/><motion.circle cx="60" cy="3" r="2" fill="#e3b56a" initial={{scale:0}} animate={on?{scale:1}:{}} transition={{delay:2+a/300}}/></g>)}
  <motion.circle cx="60" cy="60" r="55" fill="none" stroke="#e3b56a" strokeWidth="1" initial={{pathLength:0}} animate={on?{pathLength:1}:{}} transition={{duration:3}}/><circle cx="60" cy="60" r="4" fill="#e3b56a"/></svg>}
const Orn=()=><div className="orn"><i/><b>❖</b><i/></div>
function Corners(){return <>{['tl','tr','bl','br'].map(c=><motion.img key={c} src={img('mandala.png')} alt="" className={'corner '+c} initial={{opacity:0,scale:.5}} whileInView={{opacity:.9,scale:1}} viewport={{once:true}} transition={{duration:1.6,ease:E}}/>)}</>}

function Diya({lit=true,onClick}){return <button className={'diya'+(lit?' lit':'')} onClick={onClick} aria-label="Light a lamp"><i className="fl"/><b/></button>}
function Gate({onDone}){
 const [o,setO]=useState(false)
 return <motion.div className="gate" exit={{opacity:0}} transition={{duration:.9}}>
  <motion.div className="gbg" style={{backgroundImage:`url(${img('intro.jpg')})`}} animate={o?{scale:3.6,opacity:0,filter:'brightness(1.8)'}:{scale:[1.05,1.16,1.05]}}
   transition={o?{duration:3,ease:[.7,0,.2,1],opacity:{delay:2,duration:1}}:{repeat:Infinity,duration:16,ease:'easeInOut'}} onAnimationComplete={()=>o&&onDone()}/>
  <div className="gveil"/><Embers n={18}/><Muggu cls="gmug"/>
  <motion.div className="flash" initial={{scale:0,opacity:0}} animate={o?{scale:[0,40],opacity:[1,0]}:{}} transition={{duration:2,delay:.4,ease:'easeOut'}}/>
  {o&&<div className="gburst"><Burst/></div>}
  <motion.button className="gnames" aria-label="Open the invitation" onClick={()=>setO(true)}
   animate={o?{y:-70,scale:1.35,opacity:0,filter:'blur(12px)',letterSpacing:'.2em'}:{y:[0,-8,0]}} transition={o?{duration:1.5,ease:[.6,0,.4,1]}:{repeat:Infinity,duration:4,ease:'easeInOut'}}>
   <small className="te">శుభలేఖ</small><small>With the blessings of our families</small><b>{W.bride} <em>&</em> {W.groom}</b><i className="te">లోపలికి రండి · Touch to step inside</i>
  </motion.button></motion.div>}

function Count(){
 const [n,setN]=useState(()=>Date.parse(W.date)-Date.now())
 useEffect(()=>{const i=setInterval(()=>setN(Date.parse(W.date)-Date.now()),1000);return()=>clearInterval(i)},[])
 const v=Math.max(n,0),u=[['Days',v/864e5],['Hours',v/36e5%24],['Minutes',v/6e4%60],['Seconds',v/1e3%60]]
 return <div className="count">{u.map(([l,x])=>{const d=String(Math.floor(x)).padStart(2,'0');return <div key={l}><div className="dig"><AnimatePresence mode="popLayout"><motion.span key={d} initial={{y:-24,opacity:0}} animate={{y:0,opacity:1}} exit={{y:24,opacity:0}} transition={{duration:.4}}>{d}</motion.span></AnimatePresence></div><small>{l}</small></div>})}</div>}

function Embers({n=26,cls='ember'}){
 const a=useMemo(()=>Array.from({length:n},(_,i)=>({l:Math.random()*100,d:Math.random()*10,t:8+Math.random()*10,s:3+Math.random()*6})),[n])
 return <div className="fx" aria-hidden="true">{a.map((e,i)=><span key={i} className={cls} style={{left:e.l+'%',animationDelay:`-${e.d}s`,animationDuration:e.t+'s',width:e.s,height:e.s}}/>)}</div>}

function Chakra({go}){const sp=[0,45,90,135,180,225,270,315],A=(d,x)=>go?{pathLength:1}:{}
 return <svg className="chakra" viewBox="0 0 200 200" aria-hidden="true">
  {[96,88,26].map((r,i)=><motion.circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#e3b56a" strokeWidth={i===2?1.6:1.1} initial={{pathLength:0}} animate={A()} transition={{duration:3,delay:1+i*.5}}/>)}
  {sp.map(a=><g key={a} transform={`rotate(${a} 100 100)`}><motion.line x1="100" y1="74" x2="100" y2="12" stroke="#e3b56a" strokeWidth="1.6" initial={{pathLength:0}} animate={A()} transition={{duration:2,delay:2+a/200}}/><motion.circle cx="100" cy="46" r="5" fill="none" stroke="#e3b56a" initial={{pathLength:0}} animate={A()} transition={{duration:1.5,delay:3+a/200}}/></g>)}
  {Array.from({length:24},(_,k)=><circle key={k} cx="100" cy="6.5" r="1.5" fill="#ffe2a8" transform={`rotate(${k*15} 100 100)`} style={{animation:`pulse 2.4s ${k*.1}s infinite`}}/>)}</svg>}
function Hero({go}){const {scrollY}=useScroll(),hy=useTransform(scrollY,[0,600],[0,-130]),ho=useTransform(scrollY,[0,520],[1,0]);return <Sec id="top" bg="konark.jpg" tone={.45} pos="30% 40%" cls="hero">
 <Embers/><div className="rays2"/><Chakra go={go}/>
 <motion.div className="moonglow" animate={{opacity:[.4,.9,.4],scale:[1,1.25,1]}} transition={{repeat:Infinity,duration:6}}/>
 <motion.div className="heroTxt" style={{y:hy,opacity:ho}}>
  <motion.p initial={{opacity:0,letterSpacing:'.1em'}} animate={go?{opacity:1,letterSpacing:'.45em'}:{}} transition={{duration:2,delay:.3}}>శుభలేఖ · The wedding of</motion.p>
  <h1><L t={W.bride} d={.8} go={go}/><motion.em initial={{scale:0,rotate:-180}} animate={go?{scale:1,rotate:0}:{}} transition={{delay:1.8,duration:1.2,ease:E}}>&</motion.em><L t={W.groom} d={1.6} go={go}/></h1>
  <motion.div initial={{opacity:0,y:20}} animate={go?{opacity:1,y:0}:{}} transition={{delay:2.8,duration:1.2}}>
   <Orn/><p className="date">{W.dateText}</p><Count/></motion.div></motion.div>
 <motion.a href="#story" className="scrollcue" animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2}}>Scroll</motion.a></Sec>}

function Invite(){return <Sec id="story" bg="palace.jpg" pos="50% 35%" tone={.7} enter="iris" cls="story" fx={<div className="chand"/>}>
 <Corners/>
 <div className="card oonjal">
  <Muggu/><p className="te sub">శ్రీ గణేశాయ నమః</p>
  <R k="clip" as="h2" className="h">Come, bless our beginning</R>
  <Orn/>
  <R k="zoom" d={.1} as="p">With the grace of the gods and the blessings of our elders, we joyfully invite you to witness two families become one.</R>
  <R k="rise" d={.2} as="p" className="par"><b>{W.brideParents}</b><br/>request the honour of your presence at the marriage of their daughter</R>
  <R k="zoom" d={.3} as="p" className="nm">{W.bride}</R>
  <R k="rise" d={.3} as="p" className="par">with</R>
  <R k="zoom" d={.4} as="p" className="nm">{W.groom}</R>
  <R k="rise" d={.4} as="p" className="par">son of <b>{W.groomParents}</b></R></div></Sec>}

const V=[['Nourishment','ఆహారం','May our home never lack food and warmth.'],['Strength','బలం','May we grow strong together in body and mind.'],['Prosperity','సంపద','May we earn and share with honest hands.'],['Joy','సుఖం','May laughter fill every season we share.'],['Family','కుటుంబం','May our families grow in love and blessing.'],['Wellbeing','ఆరోగ్యం','May we walk the years in good health.'],['Friendship','స్నేహం','May we remain the best of friends for life.']]
function Vows(){
 const [i,setI]=useState(0),[hold,setHold]=useState(false)
 useEffect(()=>{if(hold)return;const t=setInterval(()=>setI(x=>(x+1)%7),3200);return()=>clearInterval(t)},[hold])
 const v=V[i]
 return <Sec id="vows" bg="pillars.jpg" tone={.7} enter="doors" cls="vows">
  <div className="wide c"><R k="clip" as="h2" className="h">Seven steps, seven vows</R><p className="te sub">సప్తపది</p>
   <R k="zoom" className="wheel">
    <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="41" fill="none" stroke="rgba(227,181,106,.25)" strokeWidth=".4" strokeDasharray="1 1.4"/>
     <motion.circle cx="50" cy="50" r="41" fill="none" stroke="#e3b56a" strokeWidth=".8" strokeLinecap="round" transform="rotate(-90 50 50)" initial={{pathLength:0}} animate={{pathLength:(i+1)/7}} transition={{duration:1.2,ease:E}}/></svg>
    {V.map((x,k)=><button key={k} className={'vn'+(k===i?' on':'')} style={{'--a':`${k*360/7}deg`}} onClick={()=>{setHold(true);setI(k)}} aria-label={x[0]}><span>{k+1}</span></button>)}
    <div className="agni"><div className="flame"/><AnimatePresence mode="wait"><motion.p key={i} className="te" initial={{opacity:0,y:14,filter:'blur(6px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-14}} transition={{duration:.5}}>{v[1]}</motion.p></AnimatePresence></div>
   </R>
   <div className="vd"><AnimatePresence mode="wait"><motion.div key={i} initial={{opacity:0,rotateX:-60}} animate={{opacity:1,rotateX:0}} exit={{opacity:0,rotateX:60}} transition={{duration:.5}}><h3 className="nm sm">{v[0]}</h3><p className="par">{v[2]}</p></motion.div></AnimatePresence></div></div></Sec>}
function Quote(){return <Sec id="quote" bg="hampi.jpg" tone={.55} enter="diag" cls="quote"><div className="marq" aria-hidden="true"><span>Shubhamastu ✦ Shubhamastu ✦ Shubhamastu ✦ Shubhamastu ✦ Shubhamastu ✦ Shubhamastu ✦ </span></div><h2 className="h big" style={{perspective:800}}>{'Two souls, one journey, a thousand blessings'.split(' ').map((x,i)=><motion.span key={i} style={{display:'inline-block',marginRight:'.3em'}} initial={{opacity:0,y:40,rotateX:-80,filter:'blur(8px)'}} whileInView={{opacity:1,y:0,rotateX:0,filter:'blur(0px)'}} viewport={{once:true}} transition={{delay:i*.18,duration:1,ease:E}}>{x}</motion.span>)}</h2></Sec>}
function Events(){const r=useRef(null),on=useInView(r,{once:true,amount:.05});return <Sec id="events" bg="temple-dark.jpg" tone={.62} enter="diag" cls="events">
 <div className="wide c"><R k="clip" as="h2" className="h">The festivities</R><p className="te sub">శుభ ముహూర్తం</p>
  <div className="tala" ref={r}><i className="th l"/><i className="th r"/>
   {W.events.map((e,i)=><motion.article key={i} className="strip" style={{transformOrigin:i%2?'100% 50%':'0% 50%'}} initial={{scaleX:.04,opacity:0,rotateX:-50}} animate={on?{scaleX:1,opacity:1,rotateX:0}:{}} transition={{duration:1.4,ease:E,delay:i*.3}} whileHover={{rotate:i%2?-.8:.8,y:-4}}>
    <div className="seal2"><b>{e.day}</b><span>{e.mon}</span></div>
    <div className="st"><h3>{e.name}</h3><p className="te">{e.te}</p><p>{e.note}</p></div><p className="tm2">{e.time}</p></motion.article>)}</div></div></Sec>}

function ics(){const s=new Date(W.date),e=new Date(+s+4*36e5),f=d=>d.toISOString().replace(/[-:]|\.\d{3}/g,'')
 const t=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${W.bride} & ${W.groom} Wedding\nDTSTART:${f(s)}\nDTEND:${f(e)}\nLOCATION:${W.venue.name}, ${W.venue.addr}\nEND:VEVENT\nEND:VCALENDAR`
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/calendar'}));a.download='wedding.ics';a.click()}

function Venue(){
 const vr=useRef(null),von=useInView(vr,{once:true,amount:.05})
 const x=useMotionValue(0),y=useMotionValue(0),rx=useSpring(useTransform(y,[-.5,.5],[10,-10]),{stiffness:120,damping:14}),ry=useSpring(useTransform(x,[-.5,.5],[-12,12]),{stiffness:120,damping:14})
 const mv=e=>{const b=e.currentTarget.getBoundingClientRect();x.set((e.clientX-b.left)/b.width-.5);y.set((e.clientY-b.top)/b.height-.5)}
 return <Sec id="venue" bg="waterfall.jpg" tone={.5} enter="curtain" cls="venue" fx={<><div className="fall"/><div className="mist"/></>}>
  <div style={{perspective:1000}} ref={vr}><motion.div className="card tilt" style={{rotateX:rx,rotateY:ry}} onMouseMove={mv} onMouseLeave={()=>{x.set(0);y.set(0)}}
   initial={{opacity:0,rotateX:60,y:120}} animate={von?{opacity:1,rotateX:0,y:0}:{}} transition={{duration:1.4,ease:E}}>
   <h2 className="h">Where we gather</h2><Orn/>
   <p className="nm sm">{W.venue.name}</p><p className="te sub">తిరుపతి, ఆంధ్ర ప్రదేశ్</p><p className="par">{W.venue.addr}</p>
   <p className="par">{W.dateText} · Muhurtham 7:30 AM</p>
   <div className="btns"><a className="btn" href={W.venue.map} target="_blank" rel="noreferrer">Open in Maps</a><button className="btn ghost" onClick={ics}>Add to calendar</button></div></motion.div></div></Sec>}

function Burst(){return <div className="burst">{Array.from({length:28},(_,i)=>{const a=i/28*6.283,d=90+Math.random()*120;return <motion.i key={i} initial={{x:0,y:0,scale:1,opacity:1}} animate={{x:Math.cos(a)*d,y:Math.sin(a)*d,scale:0,opacity:0,rotate:360}} transition={{duration:1.7,delay:.35,ease:'easeOut'}}/>})}</div>}
function Seal({big}){return <motion.svg className={'seal'+(big?' big':'')} viewBox="0 0 120 120" initial={{scale:3.2,rotate:-40,opacity:0}} animate={{scale:1,rotate:0,opacity:1}} transition={{type:'spring',stiffness:180,damping:12,delay:.2}}>
 <path d="M60 4c14 0 20 10 32 12s14 18 18 30-6 18-6 30-8 16-18 22-20 8-26 8-16-4-26-8-18-10-18-22-10-18-6-30 6-28 18-30S46 4 60 4z" fill="#8e1f1f"/><circle cx="60" cy="60" r="38" fill="none" stroke="#e3b56a" strokeWidth="2" opacity=".8"/>
 <text x="60" y="70" textAnchor="middle" fontFamily="Marcellus,serif" fontSize="30" fill="#f5e8cc">{W.bride[0]}&amp;{W.groom[0]}</text></motion.svg>}

function Rsvp(){
 const sr=useRef(null),son=useInView(sr,{once:true,amount:.05})
 const [f,setF]=useState({name:'',yes:true,n:1,msg:''}),[sent,setSent]=useState(false)
 const up=(k,v)=>setF(s=>({...s,[k]:v}))
 const go=e=>{e.preventDefault();if(!f.name.trim())return;try{localStorage.setItem('rsvp',JSON.stringify(f))}catch{};setSent(true)}
 const wa=`https://wa.me/${W.whatsapp}?text=${encodeURIComponent(`${f.yes?'Joyfully attending':'Unable to attend'} - ${f.name}${f.yes?` (${f.n} guest${f.n>1?'s':''})`:''}. ${f.msg}`)}`
 return <Sec id="rsvp" bg="rock.jpg" tone={.55} enter="rise" cls="rsvp"><Embers n={16}/>
  <div className="wide c" ref={sr}>
   <R k="zoom" as="h2" className="h">Kindly reply</R><R k="rise" as="p" className="te sub">మీ రాక మాకు ఆనందం</R>
   <motion.div className="scroll" initial={{scaleY:.05,opacity:0}} animate={son?{scaleY:1,opacity:1}:{}} transition={{duration:1.5,ease:E}}>
    <AnimatePresence mode="wait">{!sent?
     <motion.form key="f" onSubmit={go} exit={{opacity:0,scale:.9,filter:'blur(6px)'}}>
      <label>Your name<input value={f.name} onChange={e=>up('name',e.target.value)} placeholder="Full name" required/></label>
      <div className="tg">{[[true,'Joyfully attending'],[false,'Regretfully absent']].map(([v,t])=><button type="button" key={t} onClick={()=>up('yes',v)} className={f.yes===v?'on':''}>{f.yes===v&&<motion.i layoutId="pill"/>}<span>{t}</span></button>)}</div>
      <AnimatePresence>{f.yes&&<motion.div className="step" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><span>Guests</span>
       <button type="button" onClick={()=>up('n',Math.max(1,f.n-1))} aria-label="Fewer">−</button><motion.b key={f.n} initial={{y:-14,opacity:0}} animate={{y:0,opacity:1}}>{f.n}</motion.b><button type="button" onClick={()=>up('n',Math.min(10,f.n+1))} aria-label="More">+</button></motion.div>}</AnimatePresence>
      <label>A blessing for the couple<textarea rows="3" value={f.msg} onChange={e=>up('msg',e.target.value)} placeholder="Write a few words"/></label>
      <button className="btn" type="submit">Seal my reply</button></motion.form>
     :<motion.div key="s" className="done" initial={{opacity:0}} animate={{opacity:1}}>
      <Seal big/><Burst/><h3>{f.yes?'We will see you there':'You will be missed'}, {f.name.split(' ')[0]}</h3>
      <p>Your reply is sealed. Send it to the families so they can count on you.</p>
      <a className="btn" href={wa} target="_blank" rel="noreferrer">Send on WhatsApp</a></motion.div>}</AnimatePresence></motion.div></div></Sec>}

const LAY=[{n:9,span:164,h:1,c:['#ffd9e1','#e5819c']},{n:7,span:130,h:.84,c:['#ffe8ec','#f09fb3']},{n:5,span:84,h:.64,c:['#fff3d0','#e3b56a']}]
function Lotus(){const r=useRef(null),on=useInView(r,{once:true,amount:.3})
 return <div className="lotus" ref={r}>{LAY.map((l,li)=>Array.from({length:l.n},(_,k)=>{const a=-l.span/2+k*l.span/(l.n-1)
  return <div key={li+'-'+k} className="lp" style={{transform:`rotate(${a}deg)`,height:`${l.h*100}%`}}><motion.i className="lq" style={{'--c1':l.c[0],'--c2':l.c[1]}} initial={{scaleY:0,opacity:0}} animate={on?{scaleY:1,opacity:1}:{}} transition={{duration:1.2,delay:li*.6+k*.07,ease:E}}/></div>}))}</div>}
function Foot(){
 const [cp,setCp]=useState(false),url=typeof location!=='undefined'?location.href:''
 const msg=`You are warmly invited to the wedding of ${W.bride} & ${W.groom} on ${W.dateText}. ${url}`
 return <Sec id="end" bg="konark.jpg" tone={.7} pos="70% 50%" enter="iris" cls="foot"><Embers n={26} cls="petal"/><Embers n={44} cls="rice"/>
  <div className="fcol"><Lotus/>
   <R k="zoom" d={.4}><p className="te sub">శుభం భూయాత్ · తలంబ్రాల ఆశీస్సులు</p><p className="nm">{W.bride} & {W.groom}</p><Orn/>
    <p className="par">{W.dateText}</p><p className="par">Your blessings are the greatest gift. Share this invitation with family and friends.</p>
    <div className="btns"><a className="btn" href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer">Share on WhatsApp</a>
     <button className="btn ghost" onClick={()=>{try{navigator.clipboard.writeText(url)}catch{};setCp(true)}}>{cp?'Link copied':'Copy invitation link'}</button></div></R></div></Sec>}

export default function App(){
 const [open,setOpen]=useState(false),{scrollYProgress:p}=useScroll()
 useEffect(()=>{document.body.style.overflow=open?'':'hidden';if(!open)window.scrollTo(0,0)},[open])
 return <>
  <motion.div className="bar" style={{scaleX:p}}/>
  <AnimatePresence>{!open&&<Gate onDone={()=>setOpen(true)}/>}</AnimatePresence>
  <Hero go={open}/><Invite/><Vows/><Events/><Quote/><Venue/><Rsvp/><Foot/></>}
