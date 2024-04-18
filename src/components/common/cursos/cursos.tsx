import { getCourses } from "@/components/data/course/fetchCourse";

interface Courses {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  total_aulas: string;
  total_horas: string;
}

export default async function cursosLista() {
  const response = (await getCourses()) as Array<Courses>;

  return (
    <main>
      <div>
        {response.map((data: Courses, index: number) => (
          <li key={index}>
            <p>Nome: {data.nome}</p>
            <p>descricao: {data.descricao}</p>
            <p>total de aulas: {data.total_aulas}</p>
            <button>ver mais</button>
          </li>
        ))}
      </div>
    </main>
  );
}
