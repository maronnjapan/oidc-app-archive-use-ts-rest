import { Suspense } from "react";
import Authorize from "../../components/organisms/Authorize";


export default function Page() {
  return <Suspense><Authorize></Authorize></Suspense>
}
