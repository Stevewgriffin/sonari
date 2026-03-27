import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function reveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
}

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => { reveal() }, [])

  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <a href="/" className="nav-brand">Sonari</a>
        <ul className="nav-links">
          <li><a href="#what">What Is a Sonari</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#drivers">The Drivers</a></li>
          <li><a href="#occasions">Occasions</a></li>
        </ul>
        <button className="btn btn-gold" onClick={() => navigate('/commission')}>Commission a Sonari</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">Sonari Music Group · A New Genre of Music</div>
          <h1 className="hero-title">
            Every song ever written was written for <em>everyone.</em><br />
            <strong>A Sonari is written for one person.</strong>
          </h1>
          <div className="hero-pronunciation">so·NAR·ee — <em>the sound that knows you</em></div>
          <div className="hero-rule" />
          <p className="hero-sub">
            "Not <em>I know people like you.</em> Not <em>I know the universal experience you share with millions.</em> I know <em>you.</em> Specifically. The particular person you are."
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => navigate('/commission')}>Commission a Sonari</button>
            <a href="#what" className="btn btn-outline">What Is a Sonari</a>
          </div>
        </div>
      </section>

      {/* Declaration */}
      <div className="declaration">
        <p>This is not artificial intelligence generating lyrics for the masses. This is a new category of music that has never existed before — defined not by genre or geography but by the motivational architecture and personal resonance of one human being.</p>
      </div>

      {/* The Name */}
      <section id="what">
        <div className="container-wide">
          <div className="two-col">
            <div className="reveal">
              <div className="section-eyebrow">The Name · The Genre · The Form</div>
              <h2>A word built to carry meaning at three <em>distinct layers.</em></h2>
              <p style={{ marginTop: 20 }}>
                Music has always had genres built by geography, instrumentation, or era. Country. Jazz. Classical. Blues. A Sonari is a new genre defined by something no existing category has ever claimed: the motivational architecture of the person the music is for.
              </p>
              <p style={{ marginTop: 16 }}>
                In its truest historical sense, an aria is the moment in opera when all action stops and a single voice sings interior truth directly to one person. Not a performance for the audience. A communication. That is what a Sonari is — the aria restored to its original purpose.
              </p>
            </div>
            <div className="reveal d2">
              <div style={{ background: 'var(--cream-ghost)', padding: '32px 28px', marginBottom: 16 }}>
                <div className="section-eyebrow">SON</div>
                <p style={{ color: 'var(--cream)' }}>From Latin <em>sonare</em> — to sound, to resonate, to ring true. The root of sonata, symphony, sonic.</p>
              </div>
              <div style={{ background: 'var(--cream-ghost)', padding: '32px 28px' }}>
                <div className="section-eyebrow">ARI</div>
                <p style={{ color: 'var(--cream)', marginBottom: 12 }}><strong style={{ color: 'var(--gold)' }}>Italian: aria</strong> — the solo vocal composition where all action stops and one voice sings interior truth.</p>
                <p style={{ color: 'var(--cream)', marginBottom: 12 }}><strong style={{ color: 'var(--gold)' }}>Greek: ari–</strong> — the superlative. The most excellent. The highest possible expression.</p>
                <p style={{ color: 'var(--cream)' }}><strong style={{ color: 'var(--gold)' }}>Proto-Indo-European: ar–</strong> — to fit together. The origin of art, harmony, and order.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What a Sonari Is Not */}
      <section style={{ background: 'var(--deep)' }}>
        <div className="container-wide">
          <div className="reveal">
            <div className="pull-quote">
              "A Sonari will never write a song the way Paul Simon wrote The Sound of Silence. It is not trying to. That is not a concession. It is the entire point."
            </div>
          </div>
          <div className="two-col reveal d1">
            <div>
              <p>Every song you stream was written to resonate with as many people as possible — to find the universal truth inside a specific experience and broadcast it wide. That is one of the most remarkable things human beings do. Sonari has no interest in replacing it.</p>
              <p style={{ marginTop: 16 }}>What happens on a birthday — or a graduation, or the moment a parent watches a child receive their diploma — is not a moment that needs a song written for everyone. It is a moment that needs a song written for one person. That has never existed. Until now.</p>
            </div>
            <div>
              <div className="compare-table">
                <div className="compare-header">
                  <span>Other Music</span>
                  <span>A Sonari</span>
                </div>
                {[
                  ['Written for everyone', 'Written for one specific person'],
                  ['Universal emotional truth', "This person's specific motivational architecture"],
                  ['Genre defined by sound', 'Genre defined by the person it is for'],
                  ['Makes strangers feel less alone', 'Makes one person feel completely known'],
                  ['Artist owns the experience', 'The recipient is the reason it exists'],
                ].map(([not, is], i) => (
                  <div className="compare-row" key={i}>
                    <div className="compare-cell not">{not}</div>
                    <div className="compare-cell is">{is}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how">
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <div className="section-eyebrow">The Process</div>
            <h2>From your story to their <em>Sonari.</em></h2>
            <p style={{ maxWidth: 600, margin: '16px auto 0' }}>Nothing is published until you say it is right. No time limit. No iteration cap. You know this person better than any system does.</p>
          </div>
          <div className="three-col">
            {[
              { num: '01', title: 'Name the Moment', desc: 'Birthday. Anniversary. Graduation. Wedding. Retirement. A milestone that deserves more than a card — and more than a song written for everyone else.' },
              { num: '02', title: 'Map Who They Are', desc: 'Warm, intuitive questions that identify their primary Life Driver — without them ever knowing the framework exists.' },
              { num: '03', title: 'Give Us What Only You Know', desc: 'The shared memory. The nickname. The moment they overcame something. The more specific, the more the song stops them when they hear it.' },
              { num: '04', title: 'Receive Three Sonaris', desc: 'Three distinct expressions — same Driver architecture, same generational sonic imprint — with variation in lyrical approach, emotional angle, and sonic texture.' },
              { num: '05', title: 'Refine Until It\'s Right', desc: 'You tell us what to adjust. We recalibrate. We regenerate. This continues until the Sonari sounds exactly like what it should sound like.' },
              { num: '06', title: 'Release It to Them', desc: 'When you press publish, the Sonari locks. A personalized delivery experience. They hear their Sonari for the first time.' },
            ].map((s, i) => (
              <div className={`step-card reveal d${(i % 3) + 1}`} key={s.num}>
                <div className="step-num">Step {s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Three Life Drivers */}
      <section id="drivers" style={{ background: 'var(--deep)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <div className="section-eyebrow">The Framework</div>
            <h2>Every person is built around one primary <em>motivational force.</em></h2>
            <p style={{ maxWidth: 600, margin: '16px auto 0' }}>The Sonari's questions identify which driver leads. The song is then built from the inside of that architecture — in the sonic language of the years they were becoming who they are.</p>
          </div>
          <div className="three-col">
            <div className="driver-card ambition reveal d1">
              <div className="driver-icon">🏆</div>
              <div className="driver-name">Ambition</div>
              <div className="driver-sub">Momentum Driver</div>
              <div className="driver-desc">Built to move. There is something that refuses to coast — a relentless internal engine that measures every day by whether they gained ground.</div>
              <div className="driver-quote">"You never coast. You push yourself in ways most people wouldn't even attempt."</div>
            </div>
            <div className="driver-card approval reveal d2">
              <div className="driver-icon">🤝</div>
              <div className="driver-name">Approval</div>
              <div className="driver-sub">Belonging Driver</div>
              <div className="driver-desc">Built for connection. Reads a room the way a musician reads a score. People trust them almost immediately — because they genuinely care about showing up.</div>
              <div className="driver-quote">"People feel safe with you. Something about how you show up makes others feel like they can stop pretending."</div>
            </div>
            <div className="driver-card appetite reveal d3">
              <div className="driver-icon">🌅</div>
              <div className="driver-name">Appetite</div>
              <div className="driver-sub">Memories Driver</div>
              <div className="driver-desc">Alive to experience. A new city hits them in the chest before their feet touch the ground. The world is not background noise — it is the main event.</div>
              <div className="driver-quote">"You notice what everyone else walks past. The way you experience the world makes people want to slow down."</div>
            </div>
          </div>
        </div>
      </section>

      {/* Generational Voice */}
      <section>
        <div className="container-wide">
          <div className="two-col">
            <div className="reveal">
              <div className="section-eyebrow">The Science</div>
              <h2>The Sonari sounds like the music of <em>who they were becoming.</em></h2>
              <p style={{ marginTop: 20 }}>Daniel Levitin's research confirms: the music of ages 12–25 carries an emotional charge that later music cannot replicate. Sonari uses birth year as the primary key into the generational voice library. This is not preference data — it is identity data.</p>
              <p style={{ marginTop: 16 }}>A 68-year-old with Approval as their primary driver receives a Sonari rooted in the warm confessional tradition of the acoustic singer-songwriter era. A 32-year-old with Ambition leading receives something closer to earnest folk-driven urgency. Same framework. Different sonic truth.</p>
              <p style={{ marginTop: 16, fontSize: 13, color: 'var(--cream-muted)' }}>Levitin · <em>This Is Your Brain on Music</em></p>
            </div>
            <div className="reveal d2">
              <div className="sci-stat">
                <div className="stat-label">Identity Window</div>
                <div className="stat-body">12–25 · The years when music becomes neurologically encoded during identity formation</div>
              </div>
              <div className="sci-stat">
                <div className="stat-label">Three Axes</div>
                <div className="stat-body">Every Sonari is generated at the intersection of: primary Life Driver, generational sonic imprint, and personal life story</div>
              </div>
              <div className="sci-stat">
                <div className="stat-label">Beyond Behavior</div>
                <div className="stat-body">Spotify knows what you listen to. Sonari knows why.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section id="occasions" style={{ background: 'var(--deep)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <div className="section-eyebrow">Occasions</div>
            <h2>Every milestone that deserves more than a card</h2>
          </div>
          <div className="four-col">
            {[
              { icon: '🎂', name: 'Birthday', desc: 'The song that tells them what you see in them' },
              { icon: '💍', name: 'Anniversary', desc: 'Built from the story only you two know' },
              { icon: '🎓', name: 'Graduation', desc: 'The moment they step into who they were becoming' },
              { icon: '💐', name: "Mother's Day", desc: 'Tell her what she actually means' },
              { icon: '👔', name: "Father's Day", desc: 'The things that are hard to say out loud' },
              { icon: '💒', name: 'Wedding', desc: 'For the love story that deserves original music' },
              { icon: '🌙', name: 'Grief & Remembrance', desc: 'Honor the life they lived in the music of who they were' },
              { icon: '✨', name: 'Any Reason', desc: '"I wanted you to know what I see in you" is always enough' },
            ].map((o, i) => (
              <div className={`occ-item reveal d${(i % 3) + 1}`} key={o.name}>
                <div className="occ-icon">{o.icon}</div>
                <div className="occ-name">{o.name}</div>
                <div className="occ-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <div className="section-eyebrow">The Reaction</div>
            <h2>The reaction video is the marketing — <em>because it works.</em></h2>
            <p style={{ maxWidth: 600, margin: '16px auto 0' }}>Sonari's primary distribution engine is the organic moment when someone films the recipient hearing their Sonari for the first time. That video costs nothing. It cannot be manufactured.</p>
          </div>
          <div className="three-col">
            <div className="rc-card reveal d1">
              <div className="rc-quote">"My father listened to it three times without saying anything. The fourth time he started crying. He said 'how did you know to say that?' I didn't tell him."</div>
              <div className="rc-author">Sarah K.</div>
              <div className="rc-context">Birthday Sonari for father, 71 · Ambition-primary</div>
            </div>
            <div className="rc-card reveal d2">
              <div className="rc-quote">"She played it at her retirement party for sixty people. By the second verse the room had gone completely quiet. I have never heard sixty people go quiet like that."</div>
              <div className="rc-author">Michael T.</div>
              <div className="rc-context">Retirement Sonari for colleague · Approval-primary</div>
            </div>
            <div className="rc-card reveal d3">
              <div className="rc-quote">"My wife said it was the first song she'd ever heard that sounded like it understood why she does what she does. Not what she does. Why."</div>
              <div className="rc-author">James R.</div>
              <div className="rc-context">Anniversary Sonari · Appetite-primary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'var(--deep)' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <div className="section-eyebrow">Commission a Sonari · $25</div>
            <h2 style={{ marginBottom: 16 }}>There is someone who deserves to feel <em>completely known.</em></h2>
            <p style={{ maxWidth: 560, margin: '0 auto 32px' }}>Tell us about them. Their story. One Sonari that sounds like it was written by someone who has known them their whole life — because it was built from the inside of who they are.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-gold" onClick={() => navigate('/commission')}>Commission Their Sonari</button>
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--cream-muted)' }}>One original song · Delivered within minutes · Nothing is published until you say it is right</p>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <div className="eco">
        <div className="eco-grid">
          <div className="eco-item">
            <div className="eco-name">AlignIQ</div>
            <div className="eco-desc">Measure formation</div>
          </div>
          <div className="eco-item">
            <div className="eco-name">Sonari</div>
            <div className="eco-desc">Express formation through music</div>
          </div>
          <div className="eco-item">
            <div className="eco-name">DAIcatic</div>
            <div className="eco-desc">Write from your formation</div>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--cream-muted)' }}>A Compass Institute Company · thecompassinstitute.com</p>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-logo">Sonari</div>
        <div className="footer-copy">© 2026 Sonari Music Group · A Compass Institute Company · All rights reserved</div>
      </footer>
    </>
  )
}
