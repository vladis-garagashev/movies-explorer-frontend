import React from 'react';


import './AboutProject.css'

function AboutProject({ loggedIn }) {
  return (
    <section className="about" name ="about">
      <h2 className="about__title">О проекте</h2>

      <div className="about__table">
        <div className="about__table-section">
          <h3 className="about__table-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__table-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>

        <div className="about__table-section">
          <h3 className="about__table-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__table-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="about__graph">
        <div className="about__graph-section">
          <p className="about__graph-text about__graph-text_type_green">1 неделя</p>
          <p className="about__graph-title">Back-end</p>
        </div>

        <div className="about__graph-section">
          <p className="about__graph-text">4 недели</p>
          <p className="about__graph-title">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
