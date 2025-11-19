/**
 * Компонент демонстрации цветовой палитры
 * Показывает все доступные цвета и их использование
 */

export function ColorPaletteDemo() {
  return (
    <div className="space-y-8 p-8 bg-background">
      {/* Заголовок */}
      <div>
        <h1 className="text-48 font-700 text-text mb-2">Цветовая палитра</h1>
        <p className="text-18 text-text-secondary">
          Демонстрация всех доступных цветов проекта
        </p>
      </div>

      {/* Основная палитра */}
      <section>
        <h2 className="text-32 font-600 text-text mb-4">Основная палитра</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <ColorCard
            name="Ice Cold"
            hex="#a0d2eb"
            className="bg-ice-cold"
            textClass="text-gray-900"
          />
          <ColorCard
            name="Freeze Purple"
            hex="#e5eaf5"
            className="bg-freeze-purple"
            textClass="text-gray-900"
          />
          <ColorCard
            name="Medium Purple"
            hex="#d0bdf4"
            className="bg-medium-purple"
            textClass="text-gray-900"
          />
          <ColorCard
            name="Purple Pain"
            hex="#8458B3"
            className="bg-purple-pain"
            textClass="text-white"
          />
          <ColorCard
            name="Heavy Purple"
            hex="#a28089"
            className="bg-heavy-purple"
            textClass="text-white"
          />
        </div>
      </section>

      {/* Семантические цвета */}
      <section>
        <h2 className="text-32 font-600 text-text mb-4">Семантические цвета</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <ColorCard
              name="Primary"
              className="bg-primary"
              textClass="text-white"
            />
            <ColorCard
              name="Primary Hover"
              className="bg-primary-hover"
              textClass="text-white"
            />
            <ColorCard
              name="Primary Active"
              className="bg-primary-active"
              textClass="text-white"
            />
          </div>
          <div className="space-y-2">
            <ColorCard
              name="Secondary"
              className="bg-secondary"
              textClass="text-gray-900"
            />
            <ColorCard
              name="Secondary Hover"
              className="bg-secondary-hover"
              textClass="text-gray-900"
            />
            <ColorCard
              name="Secondary Active"
              className="bg-secondary-active"
              textClass="text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <ColorCard
              name="Accent"
              className="bg-accent"
              textClass="text-gray-900"
            />
            <ColorCard
              name="Accent Hover"
              className="bg-accent-hover"
              textClass="text-gray-900"
            />
            <ColorCard
              name="Accent Active"
              className="bg-accent-active"
              textClass="text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Состояния */}
      <section>
        <h2 className="text-32 font-600 text-text mb-4">Цвета состояний</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ColorCard
            name="Success"
            className="bg-success"
            textClass="text-white"
          />
          <ColorCard
            name="Warning"
            className="bg-warning"
            textClass="text-gray-900"
          />
          <ColorCard name="Error" className="bg-error" textClass="text-white" />
          <ColorCard name="Info" className="bg-info" textClass="text-white" />
        </div>
      </section>

      {/* Примеры кнопок */}
      <section>
        <h2 className="text-32 font-600 text-text mb-4">Примеры компонентов</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white px-6 py-3 rounded-lg transition-all">
            Primary Button
          </button>
          <button className="bg-secondary hover:bg-secondary-hover text-gray-900 px-6 py-3 rounded-lg transition-all">
            Secondary Button
          </button>
          <button className="bg-accent hover:bg-accent-hover text-gray-900 px-6 py-3 rounded-lg transition-all">
            Accent Button
          </button>
          <button className="gradient-purple text-white px-6 py-3 rounded-lg transition-all">
            Gradient Button
          </button>
        </div>
      </section>

      {/* Примеры карточек */}
      <section>
        <h2 className="text-32 font-600 text-text mb-4">Карточки</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-24 font-600 text-text mb-2">Карточка 1</h3>
            <p className="text-text-secondary">
              Пример карточки с использованием системы цветов
            </p>
          </div>
          <div className="bg-surface-secondary  border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-24 font-600 text-text mb-2">Карточка 2</h3>
            <p className="text-text-secondary">Вторичный фон поверхности</p>
          </div>
          <div className="gradient-cool border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-24 font-600 text-gray-900 mb-2">Карточка 3</h3>
            <p className="text-gray-700">С градиентным фоном</p>
          </div>
        </div>
      </section>

      {/* Текстовые стили */}
      <section>
        <h2 className="text-32 font-600 text-text mb-4">Текстовые стили</h2>
        <div className="space-y-2">
          <p className="text-text text-24 font-600">
            Основной текст (text-text)
          </p>
          <p className="text-text-secondary text-20">
            Вторичный текст (text-text-secondary)
          </p>
          <p className="text-text-tertiary text-18">
            Третичный текст (text-text-tertiary)
          </p>
        </div>
      </section>
    </div>
  );
}

interface ColorCardProps {
  name: string;
  hex?: string;
  className: string;
  textClass: string;
}

function ColorCard({ name, hex, className, textClass }: ColorCardProps) {
  return (
    <div
      className={`${className} p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow`}
    >
      <p className={`${textClass} font-600 text-18 mb-1`}>{name}</p>
      {hex && <p className={`${textClass} opacity-80 text-14`}>{hex}</p>}
    </div>
  );
}
