import { SOCIAL_MEDIAS } from "../constants";

const SocialMedias = () => {

  return <div id="socials">

    {SOCIAL_MEDIAS.map(item => {
      return <a
        key={item.url}
        href={item.url}
        title={item.label}
        target='_blank'
        className="social" rel="noreferrer"
      >
        <i className={item.icon}></i>
      </a>
    })}

  </div>
}

export default SocialMedias;