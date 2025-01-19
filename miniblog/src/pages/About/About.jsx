import React from 'react';
import styler from './About.module.css';

export default function About() {
  return (
    <div className={styler.aboutWrapper}>
      <div className={styler.aboutContainer}>
        <h1 className={styler.aboutTitle}>Sobre o MineBlog</h1>
        <p className={styler.aboutContent}>
          O MineBlog é um espaço onde compartilho ideias, insights e experiências sobre tecnologia, design e inovação. O objetivo é oferecer conteúdo de qualidade para quem busca aprender e se manter atualizado.
        </p>

        <section className={styler.missionSection}>
          <h2 className={styler.sectionTitle}>Minha Missão</h2>
          <p className={styler.sectionContent}>
            Inspirar e compartilhar conhecimento para o crescimento profissional e pessoal dos meus leitores.
          </p>
        </section>

        <section className={styler.visionSection}>
          <h2 className={styler.sectionTitle}>Minha Visão</h2>
          <p className={styler.sectionContent}>
            Tornar o MineBlog uma referência em blog de tecnologia e desenvolvimento, com uma comunidade engajada.
          </p>
        </section>

        <section className={styler.valuesSection}>
          <h2 className={styler.sectionTitle}>Meus Valores</h2>
          <ul className={styler.valuesList}>
            <li>Qualidade no conteúdo</li>
            <li>Inovação</li>
            <li>Colaboração e ética</li>
            <li>Apoio à diversidade</li>
          </ul>
        </section>

        <section className={styler.authorsSection}>
          <h2 className={styler.sectionTitle}>Sobre o Autor</h2>
          <div className={styler.authorsList}>
            {/* A tag <a> agora tem o atributo target="_blank" */}
            <a href="https://github.com/TM1lz" target="_blank" rel="noopener noreferrer">
              <div className={styler.authorItem}>
                <h3>Alisson Pereira</h3>
                <p>Desenvolvedor Full-stack</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
