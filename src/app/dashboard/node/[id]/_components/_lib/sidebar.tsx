import { Link } from "solar-icon-set";

export function NodeSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__title">Node</div>
      </div>
      <div className="sidebar__content">
        <div className="sidebar__content__item">
          <div className="sidebar__content__item__title">Dashboard</div>
          <div className="sidebar__content__item__description">
            <Link href="/dashboard/node">
              <a>Console</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
