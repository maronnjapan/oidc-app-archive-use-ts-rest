import { useEffect, useState } from 'react'
import './App.css'
import { tsRestClient } from './ts-rest-client'



function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoggedIn, setLoggedIn] = useState(false);

  const { data, isLoading } = tsRestClient.getUserInfo.useQuery([])
  const { mutate: loginMutate } = tsRestClient.login.useMutation()
  const { mutate: logoutMutate } = tsRestClient.logout.useMutation()
  const { mutate: deleteUser } = tsRestClient.deleteUser.useMutation()

  useEffect(() => {

    (async () => {
      try {

        loginMutate({ body: { idToken: 'token' } })
        if (!data?.body) {
          return;
        }
        setName(data.body.email ?? '');
        setEmail(data.body.email ?? '');
        setLoggedIn(true);
      }
      catch (e) {
        setLoggedIn(false);
      }
    })()


  }, [isLoading])



  const logout = async () => {
    try {
      logoutMutate({})
      location.href = window.location.origin;
    } catch (e) {
      alert('エラーが発生しログアウトが適切にできませんでした。')
    }
  }


  const withdraw = () => {
    try {
      if (confirm('退会します。よろしいでしょうか？')) {
        deleteUser({})
        location.href = window.location.origin;
      }
    } catch (e) {
      alert('退会に失敗しました。')
    }
  }


  return (
    <>
      {isLoading && <div>ローディング中</div>}
      {!isLoading &&

        <div>
          <h3>名前:{name}</h3>
          <h3>メールアドレス:{email}</h3>
          <div>
            {isLoggedIn && <button onClick={() => logout()}>ログアウト</button>}
          </div>
          <div>
            {isLoggedIn && <button onClick={withdraw}>退会する</button>}
          </div>

        </div>
      }

    </>
  )
}

export default App
