import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser'

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { github } from '../assets';


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send('service_4e6bhi4', 'template_pds3b8f', {
      from_name: form.name,
      to_name: "Henrique",
      from_email: form.email,
      to_email: 'henriquetetilha@gmail.com',
      message: form.message,
    },
    'hWjd74_8HdPpu4js9'
    )
    .then(() => {
      setLoading(false);
      alert("message sent! I'll get back to you soon.");

      setForm({
        name: '',
        email: '',
        message: '',
      })
    }, (error) => {
      setLoading(false)
      console.error(error);
      alert('oops, something broke on my side, please try again in a bit.')
    })
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left',"tween",0.2,1)}
        className="flex-[0.75] panel p-8"
      >
        <p className={styles.prompt}>&gt; ping henrick</p>
        <h3 className={styles.sectionHeadText}>say hi.</h3>
        <p className="mt-4 text-secondary text-[16px] leading-[26px]">
          got a project, an idea, or just wanna talk about games? drop a message and I'll reply by email.
        </p>
        <a
          href="https://github.com/Henrick1"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-white font-medium hover:text-[#FFB347] transition-colors"
        >
          <img src={github} alt="" className="w-5 h-5 object-contain" />
          github.com/Henrick1
        </a>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">your name</span>
            <input 
              type="text"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="what should I call you?"
              className="bg-transparent py-3 px-0 placeholder:text-secondary/70 text-white outline-none border-0 border-b-2 border-white/20 focus:border-[#FF6B1A] transition-colors font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">your email</span>
            <input 
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="where can I reply?"
              className="bg-transparent py-3 px-0 placeholder:text-secondary/70 text-white outline-none border-0 border-b-2 border-white/20 focus:border-[#FF6B1A] transition-colors font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">your message</span>
            <textarea
              rows="7" 
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="what's up?"
              className="bg-transparent py-3 px-0 placeholder:text-secondary/70 text-white outline-none border-0 border-b-2 border-white/20 focus:border-[#FF6B1A] transition-colors font-medium"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#FF6B1A] hover:bg-[#FF8A3D] disabled:opacity-60 transition-colors py-3 px-8 outline-none w-fit text-[#140a04] font-bold rounded-md"
          >
            {loading ? 'sending...' : 'send it'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right',"tween",0.2,1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")