import styles from '../styles/Home.module.css';
import { ClientOnly } from './ClientOnly';
import { YoutubePlayer } from '../components/YoutubePlayer';
import { HTML5AudioPlayer } from '../components/HTML5AudioPlayer';
import { HTML5Player } from '../components/HTML5Player';

export default function Home() {
  return (
    <div className={styles.container}>
      <ClientOnly>
        I am a player
        {/* <YoutubePlayer /> */}
        <HTML5AudioPlayer />
        <HTML5Player />
      </ClientOnly>
    </div>
  );
}
