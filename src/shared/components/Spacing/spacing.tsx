interface ISpacing {
  direction: 'vertical' | 'horizontal';
  size: number;
}

/**
 * Spacing Component
 * @param direction 수직, 수평에 대한 정보를 받습니다.
 * @param size px단위로, 얼마나 간격(가로, 세로)를 넓히고 싶은지 정합니다.
 * @constructor
 */
function Spacing({ direction, size }: ISpacing) {
  return (
    <div
      style={{
        height: direction === 'vertical' ? `${size}px` : 'auto',
        width: direction === 'horizontal' ? `${size}px` : 'auto',
      }}
    />
  );
}

export default Spacing;
