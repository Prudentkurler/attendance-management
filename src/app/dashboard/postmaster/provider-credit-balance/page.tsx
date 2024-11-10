"use client";

// pages/postmaster/view-provider-balance.js
// import firebase from "../firebase";

export default function ViewProviderBalance() {
  //   useEffect(() => {
  //     const fetchBalances = () => {
  //       const dbRef = firebase.database().ref("providerBalance");
  //       dbRef.on("value", (snapshot) => {
  //         const data = snapshot.val();
  //         const balanceArray = Object.keys(data).map((key) => ({
  //           id: key,
  //           ...data[key],
  //         }));
  //         setBalances(balanceArray);
  //         setLoading(false);
  //       });
  //     };

  //     fetchBalances();
  //     return () => {
  //       firebase.database().ref("providerBalance").off();
  //     };
  //   }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Third-Party Provider Credit Balance
      </h1>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Provider Name</th>
            <th>Credits Remaining</th>
          </tr>
        </thead>
        <tbody>
          {/* {balances.map((balance) => (
                <tr key={balance.id}>
                  <td>{balance.providerName}</td>
                  <td>{balance.creditsRemaining}</td>
                </tr>
              ))} */}
        </tbody>
      </table>
    </div>
  );
}
