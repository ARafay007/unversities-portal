import Link from 'next/link'
import { StudentRegister } from './studentRegister';
import { Input } from '../../components/atoms/input'
// import { Button } from '../../components/atoms/button'
import { Divider } from '../../components/atoms/divider'
import { topUniversities } from '../services/university'
import styles from './page.module.css'

interface topUni {
  _id: string,
  name: string,
  category: string,
  about: string,
  ranking: number,
  fee: number[],
  courses: string[],
  isActive: boolean,
  __v: number,
  province: string,
  adminssionOpen: boolean
}

export default async function Home() {
  const {data} = await topUniversities();

  return (
    <main className={styles.main}>
      <div className={styles.main_image}>
        <h1>Universities in Pakistan</h1>
        <div>
          <StudentRegister />
        </div>
      </div>
      <section className={styles.top_uni_section}>
        <h2>Top Universities</h2>
        <Divider />
        <div>
          {
            data.length && data.map((uni: topUni) => (
              <div className={styles.university_details_container} key={uni._id}>
                <div className={styles.university_details}>
                  <h3>{uni.name}</h3>
                  <p>{uni.about}</p>
                </div>
                <div className={styles.university_detail_options}>
                  <Link href={`/${uni.category}/${uni._id}`} title="Edit">Details</Link>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  )
}
