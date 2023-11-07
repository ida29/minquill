// app/[lang]/[account]/posts/[ulid]/page.tsx
export default async function App({
  params: { lang, account, ulid },
}: {
  params: { lang: string; account: string; ulid: string };
}) {
  //const dict = await getDictionary(lang);
  console.log(lang);
  console.log(ulid);
  console.log(account);
  return <div>{`lang: ${lang}, account: ${account}, ulid: ${ulid}`}</div>;
}
