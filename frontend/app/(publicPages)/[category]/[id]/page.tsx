import {getUniverities} from "../../../services/university";
import { Divider } from "@/components/atoms/divider";
import styles from "./page.module.css";

export default async ({params: {category, id}}: {params: {category: string, id: string}}) => {

  const data = await getUniverities(category, id);

  return (
    <div className="center_div">
      <h2>{data[0].name}</h2>
      <Divider />
      <p className={styles.detail_paragraph}><strong>About:</strong> {data[0].about}</p>
      <p className={styles.detail_paragraph}><strong>Ranking:</strong> {data[0].ranking}</p>
      <p className={styles.detail_paragraph}><strong>Province:</strong> {data[0].province}</p>
      <p className={styles.detail_paragraph}><strong>Admissions:</strong> {data[0].adminssionOpen ? 'Open' : 'Close'}</p>
      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}></th>
              <th className={styles.th}>Course</th>
              <th className={styles.th}>Fee</th>
              <th className={styles.th}>Discipline</th>
            </tr>
          </thead>
          <tbody>
          {
            data[0].programs.map((el: {
              fee: string,
              course: string,
              discipline: string
            }, index: number) => (
              <tr className={styles.tr}>
                <td className={styles.td}>{index+1}</td>
                <td className={styles.td}>{el.course}</td>
                <td className={styles.td}>{el.fee}/semester</td>
                <td className={styles.td}>{el.discipline}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}