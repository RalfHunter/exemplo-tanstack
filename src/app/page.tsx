"use client"

import { fetchData } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import Posts from "@/types/Posts";
import { resolve } from "path";
import ErrorMessage from "@/components/ui/errorMessage";


export default function Home() {
  
  const {
    data:      postsData,
    isLoading: postsIsLoading,
    isError:   postsIsError,
    error:     postsError,
    refetch:   postsRefech
  } = useQuery({
    queryKey: ["listaPostsPaginaInicial"],
    queryFn:
    async() => {
      if(process.env.NEXT_PUBLIC_SIMULAR_ERRO === "true"){
        throw new Error("Erro simulado")
      }

      if(process.env.NEXT_PUBLIC_SIMULAR_LOADING === "true"){
        await new Promise (resolve => setTimeout(resolve, 3000))
      }
      return fetchData<Posts[]>("/posts")
    } 
    // 
  })

  return (
    <div>
      <h1>Listagem de posts</h1>
      {postsIsLoading && (<div className="bg-red-600 text-5xl p-2">Carregando...</div>)}
      {!postsIsLoading && !postsError && postsData?.length as number > 0 ? (<><div>Posts encontrados: {postsData?.length}</div>
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
      </Table></>  
    ):
      (<div className="border border-red-500 text-red-500 p-2">Nenhum Post encontrado</div>)
      }
      {postsIsError && <ErrorMessage
      children="Albion Online é um MMO_RPG Sandbox"
      />}
    </div>
  );
}
