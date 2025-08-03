export const getLastPage = links => {
  const res = links && links.match(/page=(\d+)>; rel="last"/i)

  return Number(res ? res[1] : 1)
}
