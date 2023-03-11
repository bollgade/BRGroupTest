import { AppRouter } from 'app/providers/router';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';

function App() {
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
