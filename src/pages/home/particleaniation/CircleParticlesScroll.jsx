import CosmicParticles from '../../../components/animations/circleparticles/CosmicParticles'
import CircleParticles from '../../../components/animations/circleparticles/CircleParticles';

export default function CircleParticlesScroll() {
  return (
    <div style={{position:"relative "}} >
      
      {/* Content */}
      <div  style={{position:"relative", zIndex:10}}>
        {/* <CircleParticles/> */}
      </div>

      {/* Particles */}
      <CosmicParticles particleCount={150} />

    </div>
  );
}