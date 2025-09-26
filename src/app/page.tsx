"use client"

import { fetchData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";

interface Posts {
  userId: number,
  id:     number,
  title:  number,
  body:   string
}


export default function Home() {
  
  const {
    data:      postsData,
    isLoading: postsLoading,
    isError:   postsIsError,
    error:     postsError,
    refetch:   postsRefech
  } = useQuery({
    queryKey: ["listaPostsPaginaInicial"],
    queryFn: async () => fetchData<Posts[]>("/posts")
  })

  return (
    <div>
      <h1>Listagem de posts</h1>
      <Table>
        <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Título</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
          {postsData?.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
