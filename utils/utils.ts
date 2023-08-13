import { ICamera, ISelectOption } from "@/Models/models";

export const getCameraOptions = (dataArr: ICamera[]) => {
  const optionsArr: ISelectOption[] = []
  dataArr.forEach(el => {
    optionsArr.push({id: el.name, label: el.name, value: el.name})
  })
  return optionsArr
}
