import { useState } from 'react';

const CookieConsent = () => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          To improve your experience on the platform and provide personalized services, we use cookies.
          By accepting, you will have access to all the site's features. If you click on "Reject Cookies", cookies that are not strictly necessary will be disabled.
          To choose which ones you want to authorize, click on "Manage cookies". Find out more in our{' '}
          <a href="#" className="underline">Cookie Declaration</a>.
        </p>
        <div className="space-x-2 ml-4">
          <button onClick={() => setShow(false)} className="bg-blue-600 px-4 py-2 rounded text-sm">Accept cookies</button>
          <button onClick={() => setShow(false)} className="bg-gray-600 px-4 py-2 rounded text-sm">Reject cookies</button>
          <button onClick={() => setShow(false)} className="bg-gray-600 px-4 py-2 rounded text-sm">Manage cookies</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;