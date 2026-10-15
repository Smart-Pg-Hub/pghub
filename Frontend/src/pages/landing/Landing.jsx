import { Link } from "react-router-dom";
import "./Landing.css";

const TAGS = [
  { id: "204", status: "available" },
  { id: "118", status: "occupied" },
  { id: "B-12", status: "available" },
  { id: "305", status: "occupied" },
  { id: "A-04", status: "available" },
  { id: "212", status: "occupied" },
  { id: "B-07", status: "available" },
  { id: "401", status: "occupied" },
  { id: "A-19", status: "available" },
  { id: "116", status: "occupied" },
];

const STEPS = [
  {
    n: "01",
    title: "Find your PG",
    body: "Explore available rooms, compare rent, amenities and locations in one place.",
  },
  {
    n: "02",
    title: "Book your room",
    body: "Choose a room and complete your booking without unnecessary calls or paperwork.",
  },
  {
    n: "03",
    title: "Manage your stay",
    body: "Track rent, complaints, notices, room details and everything related to your stay.",
  },
];

const TENANT_FEATURES = [
  {
    icon: "⌂",
    title: "Your room, organised",
    body: "Keep your room, booking, roommates and stay details together.",
  },
  {
    icon: "₹",
    title: "Simple rent tracking",
    body: "Know what is due, what is paid and keep track of your payment history.",
  },
  {
    icon: "!",
    title: "Raise complaints",
    body: "Report maintenance problems and follow their progress until resolved.",
  },
  {
    icon: "✓",
    title: "Stay updated",
    body: "Get important PG notices, maintenance updates and house announcements.",
  },
];

const OWNER_FEATURES = [
  {
    icon: "▦",
    title: "Manage every room",
    body: "See rooms, occupancy and availability across your PG properties.",
  },
  {
    icon: "₹",
    title: "Track rent",
    body: "Know which tenants have paid, who is pending and what is due.",
  },
  {
    icon: "♙",
    title: "Manage tenants",
    body: "Keep tenant information, rooms, bookings and stay history organised.",
  },
  {
    icon: "!",
    title: "Handle complaints",
    body: "Review tenant complaints and update their status from one dashboard.",
  },
];

function Landing() {
  return (
    <main className="landing">
      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__dot" />
            SMART PG MANAGEMENT
          </div>

          <h1 className="hero__title">
            Your PG life,
            <span> organised.</span>
          </h1>

          <p className="hero__subhead">
            Find a comfortable PG as a tenant or manage your properties, rooms,
            tenants and rent as an owner — all from one simple platform.
          </p>

          <div className="hero__trust">
            <div className="trust-item">
              <strong>01</strong>
              <span>Find</span>
            </div>

            <div className="trust-line" />

            <div className="trust-item">
              <strong>02</strong>
              <span>Book</span>
            </div>

            <div className="trust-line" />

            <div className="trust-item">
              <strong>03</strong>
              <span>Manage</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="visual-glow" />

          <div className="hero__board">
            <div className="board__header">
              <div>
                <span className="board__label">ROOM STATUS</span>
                <h3>Today's availability</h3>
              </div>

              <span className="board__live">
                <span />
                LIVE
              </span>
            </div>

            <div className="board__grid">
              {TAGS.map((tag, index) => (
                <div
                  key={tag.id}
                  className={`key-tag key-tag--${tag.status}`}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="key-tag__hole" />
                  <span className="key-tag__id">{tag.id}</span>
                  <span className="key-tag__status">
                    {tag.status === "available" ? "OPEN" : "TAKEN"}
                  </span>
                </div>
              ))}
            </div>

            <div className="board__footer">
              <span>
                <i className="legend-dot legend-dot--available" />
                Available
              </span>

              <span>
                <i className="legend-dot legend-dot--occupied" />
                Occupied
              </span>

              <strong>5 rooms available</strong>
            </div>
          </div>

          <div className="floating-card floating-card--top">
            <div className="floating-icon">₹</div>
            <div>
              <span>Monthly rent</span>
              <strong>₹8,500</strong>
            </div>
          </div>

          <div className="floating-card floating-card--bottom">
            <div className="check-icon">✓</div>
            <div>
              <strong>Booking confirmed</strong>
              <span>Room B-12</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats__item">
          <strong>01</strong>
          <span>Platform for tenants</span>
        </div>

        <div className="stats__item">
          <strong>02</strong>
          <span>Built for PG owners</span>
        </div>

        <div className="stats__item">
          <strong>03</strong>
          <span>One connected dashboard</span>
        </div>

        <div className="stats__item">
          <strong>04</strong>
          <span>Less paperwork</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">HOW IT WORKS</p>
            <h2>From searching to staying.</h2>
          </div>

          <p>
            Everything you need to manage a PG journey without the usual
            confusion.
          </p>
        </div>

        <div className="steps__grid">
          {STEPS.map((step) => (
            <article className="step" key={step.n}>
              <div className="step__top">
                <span>{step.n}</span>
                <div className="step__arrow">↗</div>
              </div>

              <h3>{step.title}</h3>

              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="paths">
        <div className="path path--tenant">
          <div className="path__content">
            <span className="chip chip--solid">FOR TENANTS</span>

            <h2>
              Everything about your stay,
              <span> in one place.</span>
            </h2>

            <p className="path__intro">
              Find your room, manage your booking and stay on top of rent,
              complaints and notices.
            </p>

            <div className="feature-grid">
              {TENANT_FEATURES.map((feature) => (
                <div className="feature" key={feature.title}>
                  <div className="feature__icon">{feature.icon}</div>
                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.body}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/register" className="path-link">
              Create tenant account
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="path path--owner">
          <div className="path__content">
            <span className="chip chip--outline">FOR OWNERS</span>

            <h2>
              Run your PG without
              <span> the paperwork.</span>
            </h2>

            <p className="path__intro">
              Manage properties, rooms, tenants, rent and complaints from a
              single owner dashboard.
            </p>

            <div className="feature-grid">
              {OWNER_FEATURES.map((feature) => (
                <div className="feature" key={feature.title}>
                  <div className="feature__icon">{feature.icon}</div>
                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.body}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/owner/register" className="path-link">
              Create owner account
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="preview">
        <div className="preview__copy">
          <p className="section-eyebrow">ONE DASHBOARD</p>

          <h2>
            Less chasing.
            <span> More managing.</span>
          </h2>

          <p>
            PGHub brings the important parts of PG management together. Tenants
            know what they need to do, while owners know exactly what needs
            attention.
          </p>

          <div className="preview__points">
            <div>
              <span>✓</span>
              <p>Rent and payment tracking</p>
            </div>

            <div>
              <span>✓</span>
              <p>Room and tenant management</p>
            </div>

            <div>
              <span>✓</span>
              <p>Complaints</p>
            </div>
          </div>
        </div>

        <div className="dashboard">
          <div className="dashboard__top">
            <div>
              <span>OWNER DASHBOARD</span>
              <strong>Property overview</strong>
            </div>

            <div className="dashboard__avatar">A</div>
          </div>

          <div className="dashboard__stats">
            <div>
              <span>Total rooms</span>
              <strong>24</strong>
            </div>

            <div>
              <span>Occupied</span>
              <strong>19</strong>
            </div>

            <div>
              <span>Available</span>
              <strong>05</strong>
            </div>
          </div>

          <div className="dashboard__list">
            <div className="dashboard__row">
              <div className="dashboard__room">
                <span className="room-box">B12</span>
                <div>
                  <strong>Rahul Patil</strong>
                  <span>Double sharing</span>
                </div>
              </div>

              <span className="dashboard-status dashboard-status--paid">
                Paid
              </span>
            </div>

            <div className="dashboard__row">
              <div className="dashboard__room">
                <span className="room-box">A04</span>
                <div>
                  <strong>Akash More</strong>
                  <span>Single sharing</span>
                </div>
              </div>

              <span className="dashboard-status dashboard-status--due">
                Due
              </span>
            </div>

            <div className="dashboard__row">
              <div className="dashboard__room">
                <span className="room-box">C08</span>
                <div>
                  <strong>Vishal Jadhav</strong>
                  <span>Triple sharing</span>
                </div>
              </div>

              <span className="dashboard-status dashboard-status--paid">
                Paid
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div>
          <p className="section-eyebrow">READY WHEN YOU ARE</p>

          <h2>
            Your PG.
            <br />
            <span>One simpler system.</span>
          </h2>

          <p>
            Whether you're looking for your next room or managing your PG, start
            with PGHub.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Landing;
