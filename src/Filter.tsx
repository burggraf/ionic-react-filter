import { IonButton, IonCheckbox, IonItem, IonLabel, IonRadio, IonRange, IonSegment, IonSegmentButton } from '@ionic/react'
import { useEffect, useState } from 'react'

import { UtilsService } from './services/utils.service'

import './Filter.css'

interface ContainerProps {
	filterData: object
	callback: Function
	closeFunction: Function
}
let initialized = false
const utils = new UtilsService()

const Filter: React.FC<ContainerProps> = ({ filterData, callback, closeFunction }) => {
	const [data, setData] = useState<object>(filterData)
	const rawData: object = { ...filterData }

	const closeMe = () => {
		closeFunction()
	}

	useEffect(() => {
		// console.log('(((((((((((((((((((((((((((((((');
		// console.log('DATA CHANGED', data);
		// console.log(')))))))))))))))))))))))))))))))');
		if (initialized) {
			callback(data)
		}
	}, [data])

	useEffect(() => {
		// console.log('========filterData is', filterData);

		// SET DEFAULT VALUES
		const newData: any = { ...data }
		{
			Object.keys(data).map((key: any, index: number) => {
				const item = (data as any)[key]
				switch (item.type) {
					case 'checkbox':
						newData[key].checked = newData[key].value
						break
					case 'radio':
						break
					case 'range':
						newData[key].value = {
							lower: (filterData as any)[key].value.lower,
							upper: (filterData as any)[key].value.upper,
						}
						break
					case 'statebutton':
						newData[key].value = newData[key].value
						break
					default:
						break
				}
			})
		}

		// console.log('init data with', newData);
		// newData.listprice.value = { lower: newData.listprice.value.lower, upper: newData.listprice.value.upper };
		setTimeout(() => {
			// console.log('set data with', newData);
			setData(newData)
			initialized = true
		}, 1000)
	}, [])

	const handleChange = (e: any) => {
		const name = /*e.target.attributes.name?.value ||*/ e.target.id
		const type = e.target.tagName
		let value: any
		let checked
		if (e.detail?.value) {
			value = e.detail.value
		}
		if (e.detail && typeof e.detail.checked !== 'undefined') {
			checked = e.detail.checked
		}
		switch (type) {
			case 'ION-RADIO-BUTTON':
				break
			case 'ION-CHECKBOX':
				if (checked != (rawData as any)[name].checked) {
					;(rawData as any)[name].value = checked // includes: {upper: value, lower: value}
					;(rawData as any)[name].checked = checked // includes: {upper: value, lower: value}
					setData(rawData)
				}
				break
			case 'ION-RANGE':
				if (
					value.lower !== (rawData as any)[name].value.lower ||
					value.upper !== (rawData as any)[name].value.upper
				) {
					;(rawData as any)[name].value = value
					setData(rawData)
				}
				break
			case 'ION-BUTTON':
				const opts: Array<object> = (rawData as any)[name].options
				const val = (rawData as any)[name].value
				let idx = opts.findIndex((item: any) => item.value === val)
				idx++
				if (idx >= opts.length) idx = 0
				;(rawData as any)[name].value = (opts[idx] as any).value
				setData(rawData)
				break
			default:
				break
		}
		// console.log('data is', data);

		return false
	}
	const closeFilter = () => {}
	return (
		<>
			<div className='filter-container'>
				{Object.keys(data).map((key: any, index: number) => {
					// const item = (data as any)[key];
					const item = (rawData as any)[key]
					switch (item.type) {
						case 'header':
							return (
								<div key={'header' + index} style={{ width: '100%' }}>
									<div style={{ width: '100%' }}>&nbsp;</div>
									<div
										style={{
											backgroundColor: 'var(--ion-color-light)',
											borderTop: '1px solid',
											borderBottom: '1px solid',
											width: '100%',
										}}>
										<IonLabel style={{ paddingLeft: '10px' }}>
											<b>{item.title}</b>
										</IonLabel>
									</div>
									<div style={{ width: '100%' }}>&nbsp;</div>
								</div>
							)
						case 'checkbox':
							return (
								<div key={'checkbox' + index} style={item.style || {}}>
									<IonLabel>{item.title}</IonLabel>
									&nbsp;&nbsp;
									<IonCheckbox
										mode='ios'
										slot='end'
										name={item.name}
										id={item.name}
										value={item.value}
										checked={item.value}
										onIonChange={handleChange}
									/>
									&nbsp;&nbsp;
								</div>
							)
						case 'radio':
							return (
								<IonItem key={item.name}>
									<IonLabel>{item.title}</IonLabel>
									<IonRadio slot='end' name={item.name} id={item.name} value={item.value} />
								</IonItem>
							)
						case 'range':
							return (
								<div key={item.name} style={{ width: '100%' }}>
									<IonLabel position='floating'>
										{item.title}:&nbsp;&nbsp;{utils.formatNumber((data as any)[key].value.lower)} -{' '}
										{utils.formatNumber((data as any)[key].value.upper)}
									</IonLabel>
									<IonRange
										mode='ios'
										color='primary'
										debounce={5}
										pin={false}
										name={item.name}
										id={item.name}
										step={item.step}
										dualKnobs={true}
										// value={{lower: 0, upper: 0}}
										value={item.value}
										min={item.min}
										max={item.max}
										onIonChange={handleChange}
									/>
								</div>
							)
						case 'statebutton':
							return (
								<div key={item.name} style={item.style || {}}>
									<IonLabel>{item.title}</IonLabel>&nbsp;&nbsp;
									<IonButton strong id={item.name} color='medium' onClick={handleChange}>
										{
											(item.options as Array<any>).find((i: any) => i && i.value === item.value)
												.label
										}
									</IonButton>
									&nbsp;&nbsp;
								</div>
							)
						case 'segment':
							return (
								<div key={item.name} className="ion-padding">
											<IonLabel>{item.title}</IonLabel>&nbsp;&nbsp;
											<IonSegment
												mode='ios'
												style={item.style || {}}
												key={`segment${item.name}`}
												scrollable
												value={item.value}>
												{(item.options as Array<any>).map((i: any) => {
													return (
														<IonSegmentButton
															style={i.style || {}}
															value={i.value}
															key={`segment${item.name}-${i.value}`}>
															{i.label}
														</IonSegmentButton>
													)
												})}
											</IonSegment>
								</div>
							)
						default:
							return null
					}
				})}
			</div>

			{/* <br/>
<br/>
<br/>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre> */}
		</>
	)
}

export default Filter
