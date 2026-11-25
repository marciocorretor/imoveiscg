# Site Marcio Flores - Etapa 1

## Variáveis de ambiente (Vercel > Settings > Environment Variables)
- PAINEL_SENHA: a senha de entrada do painel (escolha uma forte)
- PAINEL_SEGREDO: um texto longo e aleatório (qualquer coisa, 30+ caracteres)
- DATABASE_URL: criada sozinha ao conectar o banco Neon (Storage > Marketplace > Neon)
- BLOB_READ_WRITE_TOKEN: criada sozinha ao criar um Blob store (Storage > Blob)

## Publicar
1. Envie todos os arquivos desta pasta para o repositório no GitHub.
2. Na Vercel: Add New > Project > escolha o repositório > Deploy.
3. Em Storage, conecte o Neon e crie o Blob. Cadastre PAINEL_SENHA e PAINEL_SEGREDO.
4. Faça um novo deploy (Deployments > Redeploy).
5. Abra /painel no seu site e entre com a senha.
