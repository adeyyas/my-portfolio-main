const Section = ({ children, title }) => {
  return <section>
    <div className="section-header">{title}</div>
    <div className="section-content">
      {children}
    </div>
  </section>
}

export default Section;