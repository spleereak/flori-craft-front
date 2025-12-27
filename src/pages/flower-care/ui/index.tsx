import Link from "next/link";

export default function FlowCare() {
  return (
    <div className="desktop:gap-60 gap-25 desktop:px-90 desktop:pb-160 pb-100 flex w-full flex-col px-16 pt-40">
      <div className="desktop:gap-20 desktop:mb-47 mb-25 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">{">"}</p>
        <p className="caption">Уход за цветами</p>
      </div>
      <div className="desktop:gap-195 gap-70 max-w-1545 flex flex-col place-self-center">
        <div className="desktop:flex-row desktop:justify-between gap-25 flex flex-col">
          <div className="desktop:gap-73 gap-25 max-w-812 flex flex-col">
            <h1 className="h1 desktop:after:-bottom-11 max-w-587 desktop:after:h-4 after:w-76 desktop:after:w-94 relative after:absolute after:-bottom-6 after:left-0 after:h-2 after:bg-black">
              Как ухаживать за цветами в букете
            </h1>
            <ul className="desktop:ml-25 max-w-767 ml-16 flex list-decimal flex-col">
              <li className="text_p">
                Подберите подходящую вазу. Размер вазы должен быть равен 2/3
                высоты букета
              </li>
              <li className="text_p">
                ‌Ваза должна быть чистой! Помойте вазу средством для мытья
                посуды
              </li>
              <li className="text_p">
                Заполните вазу на 2/3 чистой прохладной водой
              </li>
              <li className="text_p">
                Подрежьте все стебли на 0,5-1 см. под углом 45 градусов острым
                ножом или секатором (не ножницами!) и поставьте цветы сразу в
                воду
              </li>
              <li className="text_p">
                Проследите, чтобы все стебли доставали до воды
              </li>
              <li className="text_p">
                В воду не должны попадать листья. Это приводит к загниванию воды
                и цветов. Удалите все листья, которые окажутся в воде
              </li>
              <li className="text_p">
                Меняйте воду каждый день! При смене воды необходимо вымыть вазу,
                подрезать все стебли и убрать увядшие цветы и листья
              </li>
              <li className="text_p">
                Не ставьте цветы на сквозняке, около отопительных приборов и под
                прямые солнечные лучи
              </li>
            </ul>
          </div>
          <div className="desktop:w-675 desktop:h-739 w-343 h-376 rounded-2xl bg-[#D9D9D9]" />
        </div>
        <div className="desktop:flex-row-reverse desktop:justify-between gap-25 flex flex-col">
          <div className="desktop:gap-73 gap-25 max-w-767 flex flex-col">
            <h1 className="h1 desktop:after:-bottom-11 max-w-587 desktop:after:h-4 after:w-76 desktop:after:w-94 relative after:absolute after:-bottom-6 after:left-0 after:h-2 after:bg-black">
              Как ухаживать за цветочными композициями
            </h1>
            <div className="desktop:gap-31 gap-15 max-w-767 flex flex-col">
              <p className="text_p">
                Для создания цветочной композиции используется специальная
                флористическая губка, которая удерживает воду
              </p>
              <p className="text_p">
                Подливайте воду в центр композиции раз в 1-2 дня по мере
                высыхания губки
              </p>
            </div>
          </div>
          <div className="desktop:w-675 desktop:h-739 w-343 h-376 rounded-2xl bg-[#D9D9D9]" />
        </div>
        <div className="desktop:flex-row desktop:justify-between gap-25 flex flex-col">
          <div className="desktop:gap-73 gap-25 flex flex-col">
            <h1 className="h1 desktop:after:-bottom-11 desktop:after:h-4 after:w-76 desktop:after:w-94 relative after:absolute after:-bottom-6 after:left-0 after:h-2 after:bg-black">
              Как ухаживать за цветами в букете
            </h1>
            <ul className="max-w-767 desktop:ml-25 ml-16 flex list-decimal flex-col">
              <li className="text_p">
                Каждый день меняйте воду и подрезайте стебли под углом 45
                градусов
              </li>
              <li className="text_p" style={{ whiteSpace: "pre-wrap" }}>
                Для роз очень важно налить достаточное количество воды!{"\n"}
                Розы очень любят воду!
              </li>
              <li className="text_p">
                Стебли должны быть погружены в воду на 2/3
              </li>
            </ul>
          </div>
          <div className="desktop:w-675 desktop:h-739 w-343 h-376 rounded-2xl bg-[#D9D9D9]" />
        </div>
        <div className="desktop:flex-row-reverse desktop:justify-between gap-25 flex flex-col">
          <div className="desktop:gap-73 gap-25 max-w-812 flex flex-col">
            <h1 className="h1 desktop:after:-bottom-11 desktop:after:h-4 after:w-76 desktop:after:w-94 relative after:absolute after:-bottom-6 after:left-0 after:h-2 after:bg-black">
              Рекомендации при транспортировке цветов
            </h1>
            <ul className="desktop:ml-25 ml-16 flex list-decimal flex-col">
              <li className="text_p">
                Не оставляйте букет без воды на время, более 15 минут.
              </li>
              <li className="text_p">
                Не оставляйте букеты и композиции в автомобиле с неработающим
                двигателем на длительное время, в особенности, в жаркое и
                холодное время года.
              </li>
              <li className="text_p">
                Не переносите букеты и композиции по улице без утепления при
                температуре ниже +2 градусов.
              </li>
              <li className="text_p">
                Не держите цветы на улице дольше 15 минут в холодное время года
                даже в утепленной упаковке
              </li>
            </ul>
          </div>
          <div className="desktop:w-675 desktop:h-739 w-343 h-376 rounded-2xl bg-[#D9D9D9]" />
        </div>
      </div>
    </div>
  );
}
